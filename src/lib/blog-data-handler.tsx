import path from 'path';
import fs from 'fs';

//import front-matter processor
import matter from 'gray-matter';

//import markdown processor
import {remark} from 'remark';
import html from 'remark-html';

//import markdown MDX processor
import { compileMDX } from 'next-mdx-remote/rsc';

// Import components used in MDX processor
import Frame from '@/components/frame';


import { Feed } from 'feed';
import { getPostDataFromSlug } from './blog-post-handler';




/* Interfaces */

export interface PostData {
  slug: string,
  fileExtension: string,
  frontMatter: {
    [key: string]: any
  },
  content: string
}

export interface Post {
  slug: string,
  data: {
    [key: string]: any
  },
  html: string
}



/* Variables */

export const ALL_TAG = 'All'; //This tag refers to every blog post
export const MISC_TAG = 'Miscellaneous'; //this tag is used only on blog posts that have an empty list of tags in their frontmatter


const POST_DIR = "./src/posts";

function getFiles() {
  return fs.readdirSync(path.resolve(POST_DIR));
}

function getPostData(fileName: string) : PostData {
  let filePath = path.resolve(POST_DIR, `./${fileName}`);

  const fileContent = fs.readFileSync(filePath);
  const matterResult = matter(fileContent);

  let parsedPath = path.parse(filePath);

  //Add misc tag to frontmatter that has an empty list of tags
  if(matterResult.data.tags.length == 0) {
    matterResult.data.tags.push(MISC_TAG);
  }

  return {
    slug: parsedPath.name, 
    fileExtension: parsedPath.ext, 
    frontMatter: matterResult.data, 
    content: matterResult.content
  };
}


/*
  Retrieves an array of PostData objects sorted from newest to oldest.
*/
export function getPostDataSortedByDate() {
  let allData: PostData[] = [];

  const files = getFiles();

  const canAddPost = (post: PostData) => {
    //if running in development environment, retrieve all posts, including drafts.
    //if running in production environment, only retrieve the posts that are not drafts unless USE_DRAFTS is not set to 1
    return process.env.NODE_ENV == 'development' || process.env.USE_DRAFTS == '1' || !post.frontMatter.draft;
  };

  for(let file of files) {
    let data = getPostData(file);
    if(!canAddPost(data)) {
      continue;
    }
    
    if(allData.length == 0) {
      allData.push(data);
      continue;
    }

    //checks if the post of the current file is older than all posts
    //currently in the allData array. 
    let isOldest = true;

    //this for loop checks where to insert the post data from the current
    //file in the list of posts.
    for(let i = 0; i < allData.length; i++) {

      //if the data being inserted is newer than the post at the current
      //index...
      if(allData[i].frontMatter.date < data.frontMatter.date){
        //push the older data in the list foward once and put 
        //the current data object in the gap left behind
        allData.splice(i, 0, data);

        // set isOldest to false to avoid executing code after this loop
        isOldest = false;

        //make sure to BREAK because this will result in infinite
        //loop where the same element keeps being inserted for every iteration,
        //making the list "infinitely" long. This causes a 
        // NodeJS 'socket hang up' error.
        break;
      }

      //if the data at the current index is newer than the data
      //being inserted, iterate.
    }

    //if the for loop completes without inserting the post into the 
    //allData array, that means that the post is the older than all 
    //posts in the allData array. 
    //Thus, the post gets appended to the end of the allData array.
    if(isOldest) {
      allData.push(data);
    }
  }

  return allData;
}

async function getPostMarkdown(slug: string) : Promise<Post> {
  const postData = getPostDataFromSlug(slug)!;
  const contentHTML = (
    await remark()
      //must not sanitize input so that raw HTML in Markdown 
      //is included in output HTML.
      //Because no one else is posting content on this site,
      //via Markdown, allowing raw HTML is safe
      .use(html, {sanitize: false}) 
      .process(postData.content)
  ).toString();


  return {slug: slug, html: contentHTML, data: postData.frontMatter};
}


export async function getArticleJSXFromSlug(slug: string, className: string) {
  let postData = getPostDataFromSlug(slug)!;

  //using .mdx
  if(postData.fileExtension.includes('mdx')) {
    let {content} = await compileMDX({
      source: postData.content,
      components: {Frame},
      options: {
        //front matter was already parsed, so no need to do so here
        parseFrontmatter: false
      }
    });

    return(
      <article className={className}>
        {content}
      </article>
    );
    
  } 
  //using .md
  else {
    let post = await getPostMarkdown(slug);
    return (
      <article 
        className={className} 
        dangerouslySetInnerHTML={{__html: post.html}}
      />
    );
  }
}

export async function generateRSSFeedFiles() {
  /*
    This function is run only ONCE.
    It generates the RSS feed files for RSS2, JSON Feed, and Atom Feed based on the posts made
    and writes them into the ./public/feed directory
  */

  let feed = new Feed({
    title: "Ryan O'Connor's Personal Blog",
    description: "A blog about programming and woodworking.",
    link: process.env.BASE_URL!,
    id: process.env.BASE_URL!,
    language: "en",
    copyright: "All Rights Reserved 2023, Ryan O'Connor",
    favicon: `${process.env.BASE_URL!}/favicon.ico`,
    author: {
      name: "Ryan O'Connor",
      email: "oconnor.ryan.m@proton.me",
      link: process.env.BASE_URL!
    },
    feedLinks: {
      json: `${process.env.BASE_URL!}/feed/rss.json`,
      rss2: `${process.env.BASE_URL!}/feed/rss.xml`,
      atom: `${process.env.BASE_URL!}/feed/atom.xml`
    }
  });

  for(let postData of getPostDataSortedByDate()) {
    feed.addItem({
      title: postData.frontMatter.title!,
      id: `${process.env.BASE_URL!}/blog/post/${postData.slug}`,
      link: `${process.env.BASE_URL!}/blog/post/${postData.slug}`,
   //   content: postData.content, MDX cannot be parsed to HTML statically, so content from it cannot be nicely formatted in RSS feed
      category: postData.frontMatter.tags,
      //image URL is not correctly generated, so I'm ignoring it.
      //image: postData.frontMatter.thumbnailSrc !== undefined ? `${process.env.BASE_URL!}${postData.frontMatter.thumbnailSrc}` : undefined,
      description: postData.frontMatter.description!,
      date: postData.frontMatter.date!
    });
  }

  //Must create the feed folder manually, otherwise trying to write
  //the RSS files to a folder that does not exist will throw an
  //error in production
  fs.mkdirSync(path.resolve("./public/feed"), {recursive: true});

  fs.writeFileSync(path.resolve("./public/feed/rss.json"), feed.json1());
  fs.writeFileSync(path.resolve("./public/feed/rss.xml"), feed.rss2());
  fs.writeFileSync(path.resolve("./public/feed/atom.json"), feed.atom1());
  
}


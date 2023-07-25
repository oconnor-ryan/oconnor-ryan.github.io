import path from 'path';
import fs from 'fs';

//import markdown processor
import {remark} from 'remark';
import html from 'remark-html';

//import markdown MDX processor
import { compileMDX } from 'next-mdx-remote/rsc';

// Import components used in MDX processor
import Frame from '@/components/frame';

//import front-matter processor
import matter from 'gray-matter';


/* Interfaces */

interface PostData {
  slug: string,
  fileExtension: string,
  frontMatter: {
    [key: string]: any
  },
  content: string
}


//A wrapper for a tag that contains the tag itself and
//a URL-friendly version of the tag that can be appended to
//URLs without issues
interface TagWrapper {
  tag: string,
  urlTag: string //used so that tags in url are correctly formatted, even if tags have spaces
}

interface Post {
  slug: string,
  data: {
    [key: string]: any
  },
  html: string
}




/* Variables */

const ALL_TAG = 'All'; //This tag refers to every blog post
const MISC_TAG = 'Miscellaneous'; //this tag is used only on blog posts that have an empty list of tags in their frontmatter


const POST_DIR = "./src/posts";
const files = getFiles();

//each post is identified using a slug as its key
const allPostData : {[slug: string] : PostData} = (() => {
  let rtn: {[slug: string] : PostData} = {};

  for(let file of files) {
    let data = getPostData(file);

    //if running in development environment, retrieve all posts, including drafts.
    //if running in production environment, only retrieve the posts that are not drafts unless USE_DRAFTS is not set to 1
    if(process.env.NODE_ENV == 'development' || process.env.USE_DRAFTS == '1' || !data.frontMatter.draft) {
      rtn[data.slug] = data;
    }
  }

  return rtn;
})();

const allTags: TagWrapper[] = ( () => {
  let tags = getTagsFromFrontMatter();
  return tags.map((tag) => ({
    tag: tag, 
    
    //use a valid URL for urlTag so that it can be appended to
    //route URLs. All spaces are also replaced with hyphens because
    //when this site is exported, some web servers have issues 
    //reading directories with spaces in their names
    urlTag: encodeURI(tag.replaceAll(" ", "-")) 
  }));
})();


/* Functions */

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

function getTagsFromFrontMatter() : string[] {
  let tags = new Set<string>(); //use a set because each tag must be unique.
  for(let postData of Object.values(allPostData)) {
    for(let tag of postData.frontMatter.tags) {
      tags.add(tag as string);
    }
  }
  tags.add(ALL_TAG);
  tags.add(MISC_TAG);
  return Array.from(tags) as string[];
}

/*
  Retrieves an array of PostData objects sorted from newest to oldest.
*/
function getPostDataSortedByDate() {
  let list = [];
  for(let data of Object.values(allPostData)) {
    if(list.length == 0) {
      list.push(data);
      continue; //continue to next element
    } 

    for(let i = 0; i < list.length; i++) {

      //if at the end of the list, the data is the oldest element
      //in the list and is appended to the end of the list
      if(i == list.length-1) {
        list.push(data);

        //make sure to BREAK because this will result in infinite
        //loop where the same element keeps being inserted for every iteration,
        //making the list "infinitely" long. This causes a 
        // NodeJS 'socket hang up' error.
        break; 
      }
      //if the data at the current index is older than the next PostData
      //object being inserted
      else if(list[i].frontMatter.date < data.frontMatter.date){
        //push the older data in the list foward once and put 
        //the current data object in the gap left behind
        list.splice(i, 0, data);

        //make sure to BREAK because this will result in infinite
        //loop where the same element keeps being inserted for every iteration,
        //making the list "infinitely" long. This causes a 
        // NodeJS 'socket hang up' error.
        break;
      }

      //if the data at the current index is newer than the data
      //being inserted, iterate.
    }
    
  }
  return list;
}
/* Exports */

export { ALL_TAG, MISC_TAG};
export type { PostData, Post, TagWrapper };


export function getSlugsToAllPosts() {
  return getPostDataSortedByDate().map(data => data.slug);
}

export function getAllTags() {
  return allTags;
}

//Find the tag corresponding to the urlTag parameter
export function urlTagToTag(urlTag: string) {
  let tagWrapper = allTags.find( tagWrapper => tagWrapper.urlTag === urlTag);
  return tagWrapper ? tagWrapper.tag : undefined;
}

export function tagToTagWrapper(tag: string) {
  return allTags.find(tagWrapper => tagWrapper.tag === tag);
}

export function urlTagToTagWrapper(urlTag: string) {
  return allTags.find(tagWrapper => tagWrapper.urlTag === urlTag);
}

export async function getArticleJSXFromSlug(slug: string, className: string) {
  let postData = getPostDataFromSlug(slug);

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

//retrieve the list of postData that has the tag specified.
//if no tag was specified, the data from all posts is retrieved.
export function getPostDataWithTag(tag: string = ALL_TAG) {
  if(tag == ALL_TAG) {
    return getPostDataSortedByDate();
  }
  return getPostDataSortedByDate().filter((data, i) => {
    return data.frontMatter.tags.includes(tag);
  });
}

export function getPostDataFromSlug(slug: string) : PostData {
  return allPostData[slug];
}

export function getAllPostData() {
  return getPostDataSortedByDate();
}

export function getTagsFromSlug(slug: string) {
  return allTags.filter(tagWrapper => getPostDataFromSlug(slug).frontMatter.tags.includes(tagWrapper.tag));
}

export function sharesTag(post1: PostData, post2: PostData) {
  if(post1.frontMatter.tags.length == 0 && post2.frontMatter.tags.length == 0) {
    return true;
  }
  
  return post1.frontMatter.tags.some((tag1: string) => post2.frontMatter.tags.find((tag2: string) => tag1 === tag2));
}

export function searchForNextRelatedPosts(post: PostData, numPosts: number) {
  //get related posts that share 1 or more tags
  let nextPosts = getAllPostData().filter((data, i) => {
    if(post.frontMatter.date > data.frontMatter.date && sharesTag(post, data)) {
      return data;
    }
  });

  //if there are 3 or more matching posts, return the first 3 posts
  if(nextPosts.length >= numPosts) {
    return nextPosts.slice(0, 3);
  }

  //get posts not currently in the nextPosts array and put the 
  //first few into the nextPosts array such that the length of nextPosts
  //equals numPosts.
  let morePosts = getAllPostData()
    .sort(() => 0.5 - Math.random()) //shuffle list of posts in random order
    .filter((data, i) => !nextPosts.includes(data) && post !== data)
    .slice(0, numPosts - nextPosts.length);
    
  nextPosts.push(...morePosts);


  return nextPosts;
}


export async function getPostMarkdown(slug: string) : Promise<Post> {
  const postData = allPostData[slug];
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

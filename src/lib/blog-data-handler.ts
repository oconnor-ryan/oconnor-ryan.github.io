import path from 'path';
import fs from 'fs';

//import front-matter processor
import matter from 'gray-matter';

import { Feed } from 'feed';



/* Interfaces */

export interface PostData {
  slug: string,
  fileExtension: string,
  frontMatter: {
    [key: string]: any
  },
  content: string
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

    for(let i = 0; i < allData.length; i++) {

      //if at the end of the list, the data is the oldest element
      //in the list and is appended to the end of the list
      if(i == allData.length-1) {
        allData.push(data);

        //make sure to BREAK because this will result in infinite
        //loop where the same element keeps being inserted for every iteration,
        //making the list "infinitely" long. This causes a 
        // NodeJS 'socket hang up' error.
        break; 
      }
      //if the data at the current index is older than the next PostData
      //object being inserted
      else if(allData[i].frontMatter.date < data.frontMatter.date){
        //push the older data in the list foward once and put 
        //the current data object in the gap left behind
        allData.splice(i, 0, data);

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

  return allData;
}

export function generateRSSFeedFiles() {
  /*
    This function is run only ONCE.
    It generates the RSS feed files for RSS2, JSON Feed, and Atom Feed based on the posts made
    and writes them into the ./public/feed directory
  */

  let feed = new Feed({
    title: "Ryan O'Connor's Personal Blog",
    description: "A blog about programming and woodworking.",
    link: process.env.BASE_URL,
    id: process.env.BASE_URL!,
    language: "en",
    copyright: "All Rights Reserved 2023, Ryan O'Connor",
    favicon: `${process.env.BASE_URL}/favicon.ico`,
    author: {
      name: "Ryan O'Connor",
      email: "oconnor.ryan.m@proton.me",
      link: process.env.BASE_URL
    },
    feedLinks: {
      json: `${process.env.BASE_URL}/feed/rss.json`,
      rss2: `${process.env.BASE_URL}/feed/rss.xml`,
      atom: `${process.env.BASE_URL}/feed/atom.xml`
    }
  });

  for(let postData of getPostDataSortedByDate()) {
    feed.addItem({
      title: postData.frontMatter.title,
      id: `${process.env.BASE_URL}/blog/post/${postData.slug}`,
      link: `${process.env.BASE_URL}/blog/post/${postData.slug}`,
      description: postData.frontMatter.description,
      date: postData.frontMatter.date
    });
  }

  fs.writeFileSync(path.resolve("./public/feed/rss.json"), feed.json1());
  fs.writeFileSync(path.resolve("./public/feed/rss.xml"), feed.rss2());
  fs.writeFileSync(path.resolve("./public/feed/atom.json"), feed.atom1());
  
}


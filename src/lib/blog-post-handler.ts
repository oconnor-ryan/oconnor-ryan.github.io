import path from 'path';
import fs from 'fs';
import assert from 'assert';

//import markdown processor
import {remark} from 'remark';
import html from 'remark-html';

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

export interface Post {
  slug: string,
  data: {
    [key: string]: any
  },
  html: string
}


/* Variables */

const POST_DIR = "./src/posts";
const files = getFiles();

//each post is identified using a slug as its key
const allPostData : {[slug: string] : PostData} = (() => {
  let rtn: {[slug: string] : PostData} = {};

  for(let file of files) {
    let data = getPostData(file);
    rtn[data.slug] = data;
  }

  return rtn;
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

  return {
    slug: parsedPath.name, 
    fileExtension: parsedPath.ext, 
    frontMatter: matterResult.data, 
    content: matterResult.content
  };

}

/* Exports */

export const ALL_TAG = 'all';

export function getSlugsToAllPosts() {
  //remove .md extension from slug for a cleaner URL
  return Object.keys(allPostData);
}

export function getAllTags() : string[] {
  let tags = new Set<string>(); //use a set because each tag must be unique.
  for(let postData of Object.values(allPostData)) {
    for(let tag of postData.frontMatter.tags) {
      let tagCasted = tag as string;

      //add assert to crash program 
      assert(!tagCasted.includes(" "), `The tag '${tagCasted}' must not contain a space!`);
      tags.add(tagCasted);

    }
  }
  tags.add(ALL_TAG);
  return Array.from(tags) as string[];
}

//retrieve the list of postData that has the tag specified.
//if no tag was specified, the data from all posts is retrieved.
export function getPostDataWithTag(tag: string = ALL_TAG) {
  if(tag == ALL_TAG) {
    return getAllPostData();
  }
  let rtn = [];
  for(let postData of Object.values(allPostData)) {
    if(postData.frontMatter.tags.includes(tag)) {
      rtn.push(postData);
    }
  }

  return rtn;

}

export function getAllPostData() {
  return Object.values(allPostData);
}

export async function getPost(slug: string) : Promise<Post> {
  const postData = allPostData[slug];
  const contentHTML = (await remark().use(html).process(postData.content)).toString();

  return {slug: slug, html: contentHTML, data: postData.frontMatter};
}

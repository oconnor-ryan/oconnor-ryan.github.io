import path from 'path';
import fs from 'fs';

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

export function getSlugsToAllPosts() {
  //remove .md extension from slug for a cleaner URL
  return Object.keys(allPostData);
}

export function getAllPostData() {
  return allPostData;
}

export async function getPost(slug: string) : Promise<Post> {
  const postData = allPostData[slug];
  const contentHTML = (await remark().use(html).process(postData.content)).toString();

  return {slug: slug, html: contentHTML, data: postData.frontMatter};
}

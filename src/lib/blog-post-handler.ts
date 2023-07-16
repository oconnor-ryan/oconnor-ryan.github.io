import path from 'path';
import fs from 'fs';

//import markdown processor
import {remark} from 'remark';
import html from 'remark-html';

//import front-matter processor
import matter from 'gray-matter';


interface PostData {
  slug: string,
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

export function getSlugsToAllPosts() {
  //remove .md extension from slug for a cleaner URL
  return fs.readdirSync(path.resolve(`./src/posts`)).map((filePath) => path.parse(filePath).name);
}

function getPostData(slug: string) : PostData {
  const fileContent = fs.readFileSync(path.resolve(`./src/posts/${slug}.md`));
  const matterResult = matter(fileContent);

  return {slug: slug, frontMatter: matterResult.data, content: matterResult.content};

}

export async function getPost(slug: string) : Promise<Post> {
  const postData = getPostData(slug);
  const contentHTML = (await remark().use(html).process(postData.content)).toString();

  return {slug: slug, html: contentHTML, data: postData.frontMatter};
}

export async function getAllPosts() : Promise<Post[]>{
  let allPosts = [];
  for(let slug of getSlugsToAllPosts()) {
    allPosts.push(await getPost(slug));
  }
  return allPosts;
}

export async function getAllPostData() {
  return getSlugsToAllPosts().map( (slug) => getPostData(slug) );
}
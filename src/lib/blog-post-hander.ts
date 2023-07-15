import path from 'path';
import fs from 'fs';

//import markdown processor
import {remark} from 'remark';
import html from 'remark-html';

//import front-matter processor
import matter from 'gray-matter';


interface PostData {
  id: string,
  frontMatter: {
    [key: string]: any
  },
  content: string
}

interface Post {
  id: string,
  data: {
    [key: string]: any
  },
  html: string
}

function getPostData(name: string) : PostData {
  const fileContent = fs.readFileSync(path.resolve(`./src/posts/${name}`));
  const matterResult = matter(fileContent);

  return {id: name, frontMatter: matterResult.data, content: matterResult.content};

}

export async function getPost(name: string) : Promise<Post> {
  const postData = getPostData(name);
  const contentHTML = (await remark().use(html).process(postData.content)).toString();

  return {id: name, html: contentHTML, data: postData.frontMatter};
}

export async function getAllPostData() {
  let filePaths = fs.readdirSync(path.resolve(`./src/posts`));
  return filePaths.map( (path) => getPostData(path) );
}
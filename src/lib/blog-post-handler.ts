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

//the front matter defined by the YAML in Markdown files in posts directory
interface FrontMatter {
  title: string,
  description: string,
  tags: string[],


  //optional properties
  thumbnailImageSrc?: string,
  heroImageSrc?: string,
}

//A wrapper for a tag that contains the tag itself and
//a URL-friendly version of the tag that can be appended to
//URLs without issues
export interface TagWrapper {
  tag: string,
  urlTag: string //used so that tags in url are correctly formatted, even if tags have spaces
}

export interface Post {
  slug: string,
  data: {
    [key: string]: any
  },
  html: string
}




/* Variables */

export const ALL_TAG = 'All';


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
  return Array.from(tags) as string[];
}

/* Exports */


export function getSlugsToAllPosts() {
  //remove .md extension from slug for a cleaner URL
  return Object.keys(allPostData);
}

export function getAllTags() {
  return allTags;
}

//Find the tag corresponding to the urlTag parameter
export function urlTagToTag(urlTag: string) {
  let tagWrapper = allTags.find( tagWrapper => tagWrapper.urlTag === urlTag);
  return tagWrapper ? tagWrapper.tag : undefined;
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

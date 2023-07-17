import BlogSearchPage from '../page';

import { getPostDataWithTag } from '@/lib/blog-post-handler';

import { POSTS_PER_PAGE } from '../page';

export function generateStaticParams({params} : {params: {tag: string}}) {
  let tag = params.tag;

  let posts = getPostDataWithTag(tag);
  let numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  //generate an array containing numbers 2...numPages
  //Ex: if numPages = 4, then this returns [2,3,4,5];

  return Array.from(
    {length: numPages - 1}, //dont generate 1st page since page 1 already exists in root of directory
    (_, i) => ({page: String(i+2)}) //using 2 because page 1 starts at the root of the [tag] directory
  )
  
}

export default function BlogSearchPage1({params}: {params: {tag: string, page: string}}) {
  return <BlogSearchPage params={params}/>
}
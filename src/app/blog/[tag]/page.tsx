import BlogCardContainer from "@/components/blog-card-container";

import PageNavigator from "@/components/page-navigator";
import TagList from "@/components/tag-container";

import { getPostDataWithTag, urlTagToTag, getPostDataFromSlug, getAllTags, urlTagToTagWrapper} from "@/lib/blog-post-handler";
import { Metadata } from "next";

export const POSTS_PER_PAGE = 20;


export function generateMetadata({params}: {params: {tag: string, page: string}}) : Metadata {
  let tag = urlTagToTag(params.tag);
  return {
    title: `Blog - ${tag}`,
  };
}


export default function BlogSearchPage({params} : {params: {tag: string, page: string}}) {

  let allPosts = getPostDataWithTag(urlTagToTag(params.tag));

  let pageNum = !params.hasOwnProperty('page') ? 1 : Number(params.page);

  let start = POSTS_PER_PAGE * (pageNum - 1); 
  let end = start + POSTS_PER_PAGE;

  let posts = allPosts.slice(start, end);

  let numPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return (
    <main>
      <h1>Blog</h1>
      <TagList tags={getAllTags()} activeTag={urlTagToTagWrapper(params.tag)}/>
      <BlogCardContainer posts={posts} css={{padding: '2em 0'}}/>
      <PageNavigator pageNum={pageNum} numPages={numPages}/>
    </main>
  )
}
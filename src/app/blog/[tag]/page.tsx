import BlogCardContainer from "@/components/blog-card-container";
import styles from "./page.module.scss";

import PageNavigator from "@/components/page-navigator";

import { getPostDataWithTag, urlTagToTag} from "@/lib/blog-post-handler";

export const POSTS_PER_PAGE = 20;


export default function BlogSearchPage({params} : {params: {tag: string, page: string}}) {

  let allPosts = getPostDataWithTag(urlTagToTag(params.tag));

  let pageNum = !params.hasOwnProperty('page') ? 1 : Number(params.page);

  let start = POSTS_PER_PAGE * (pageNum - 1); 
  let end = start + POSTS_PER_PAGE;

  let posts = allPosts.slice(start, end);

  let numPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return (
    <main className={styles.blog}>
      <h1>My Blog</h1>
      <h2>Tag: {urlTagToTag(params.tag)}</h2>
      <BlogCardContainer posts={posts}/>
      <PageNavigator pageNum={pageNum} numPages={numPages}/>
    </main>
  )
}
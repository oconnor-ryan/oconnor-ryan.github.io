import styles from "./page.module.scss";

import Card from '@/components/card';
import PageNavigator from "@/components/page-navigator";

import { getPostDataWithTag } from "@/lib/blog-post-handler";

export const POSTS_PER_PAGE = 2;


export default function BlogSearchPage({params} : {params: {tag: string, page: string}}) {
  let tag = params.tag.replaceAll(/(%20)|\s/g, "-"); //replace %20 or spaces with hyphen
  
  let allPosts = getPostDataWithTag(tag);

  let pageNum = !params.hasOwnProperty('page') ? 1 : Number(params.page);

  let start = POSTS_PER_PAGE * (pageNum - 1); 
  let end = start + POSTS_PER_PAGE;

  let posts = allPosts.slice(start, end);

  let numPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return (
    <main className={styles.blog}>
      <h1>Blogs</h1>
      <div className={styles.cardContainer}>
        {posts.map(data => <Card key={data.slug} title={data.frontMatter.title} desc={data.frontMatter.description} href={"/blog/post/" + data.slug}/>)}
      </div>
      <PageNavigator pageNum={pageNum} numPages={numPages}/>
    </main>
  )
}
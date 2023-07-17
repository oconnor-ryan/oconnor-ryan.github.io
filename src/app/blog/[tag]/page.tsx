import styles from "./page.module.scss";

import Card from '@/components/card';
import PageNavigator from "@/components/page-navigator";

import { getPostDataWithTag } from "@/lib/blog-post-handler";

const postsPerPage = 2;

export function generateStaticParams({params} : {params: {tag: string}}) {
  let posts = getPostDataWithTag(params.tag);
  let numPages = Math.ceil(posts.length / postsPerPage);

  //generate an array containing numbers 2...numPages
  //Ex: if numPages = 4, then this returns [2,3,4,5];

  return Array.from(
    {length: numPages},
    (_, i) => ({page: String(i+2)}) //using 2 because page 1 starts at the root of the [tag] directory
  )
  
}

export default function BlogSearchPage({params} : {params: {tag: string, page: string}}) {
  let allPosts = getPostDataWithTag(params.tag);

  let pageNum = !params.hasOwnProperty('page') ? 1 : Number(params.page);

  let start = postsPerPage * (pageNum - 1); 
  let end = start + postsPerPage;

  let posts = allPosts.slice(start, end);

  let numPages = Math.ceil(allPosts.length / postsPerPage);

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
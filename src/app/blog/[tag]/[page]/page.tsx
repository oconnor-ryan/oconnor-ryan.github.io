import styles from "./page.module.scss";

import Card from '@/components/card';

import { getPostDataWithTag } from "@/lib/blog-post-handler";

const postsPerPage = 2;

export function generateStaticParams({params} : {params: {tag: string}}) {
  let posts = getPostDataWithTag(params.tag);
  let numPages = Math.ceil(posts.length / postsPerPage);

  //generate an array containing numbers 1...numPages
  //Ex: if numPages = 4, then this returns [1,2,3,4];

  return Array.from(
    {length: numPages},
    (_, i) => ({page: String(i+1)})
  )
  
}

export default function BlogSearchPage({params} : {params: {tag: string, page: string}}) {
  let allPosts = getPostDataWithTag(params.tag);

  let start = postsPerPage * (Number(params.page) - 1); 
  let end = start + postsPerPage;

  let posts = allPosts.slice(start, end);

  let numPages = Math.ceil(allPosts.length / postsPerPage);

  let prevPageNum = Number(params.page) - 1;
  let nextPageNum = Number(params.page) + 1;

  return (
    <main className={styles.blog}>
      <h1>Blogs</h1>
      <div className={styles.cardContainer}>
        {posts.map(data => <Card key={data.slug} title={data.frontMatter.title} desc={data.frontMatter.description} href={"/blog/post/" + data.slug}/>)}
      </div>
      <div className={styles.pageNavContainer}>
        {/* 
        If user is on first page, replace the previous page 
        button with an empty div so that flexbox correctly
        spaces out elements correctly.
        */}
        {prevPageNum > 0 ? <a className={styles.arrow} href={"../" + prevPageNum}><button>&lt;</button></a> : <div></div>}

        <p className={styles.pageNumber}>Page {params.page}</p>

        {/* 
        If user is on last page, replace the next page 
        button with an empty div so that flexbox correctly
        spaces out elements correctly.
        */}
        {nextPageNum <= numPages ? <a className={styles.arrow} href={"../" + nextPageNum}><button>&gt;</button></a> : <div></div>}


      </div>
    </main>
  )
}
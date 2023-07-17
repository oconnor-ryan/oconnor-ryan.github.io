import styles from "./page.module.scss";

import Card from '@/components/card';

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

  let prevPageNum = pageNum - 1;
  let nextPageNum = pageNum + 1;

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
        {prevPageNum > 0 ? <a className={styles.arrow} href={prevPageNum == 1 ? `../` :  `../${prevPageNum}`}><button>&lt;</button></a> : <div></div>}

        <p className={styles.pageNumber}>Page {pageNum}</p>

        {/* 
        If user is on last page, replace the next page 
        button with an empty div so that flexbox correctly
        spaces out elements correctly.
        */}
        {nextPageNum <= numPages ? <a className={styles.arrow} href={pageNum == 1 ? `./${nextPageNum}` :  `../${nextPageNum}`}><button>&gt;</button></a> : <div></div>}


      </div>
    </main>
  )
}
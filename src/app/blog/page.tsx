import styles from "./page.module.scss";

import Card from '@/components/card';

import { getAllPostData } from "@/lib/blog-post-handler";

export default async function Blog() {

  const posts = await getAllPostData();

  return (
    <main className={styles.blog}>
      <h1>Blogs</h1>
      <div className={styles.cardContainer}>
        {posts.map(data => <a key={data.slug} href={data.slug}><Card title={data.frontMatter.title} desc={data.frontMatter.description}/></a>)}
      </div>
      
    </main>
  )
}
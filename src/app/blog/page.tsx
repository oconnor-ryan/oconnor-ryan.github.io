import styles from "./page.module.scss";

import Card from '@/components/card';

import { getAllPostData } from "@/lib/blog-post-handler";

export default function Blog() {

  const posts = getAllPostData();

  return (
    <main className={styles.blog}>
      <h1>Blogs</h1>
      <div className={styles.cardContainer}>
        {Object.values(posts).map(data => <Card key={data.slug} title={data.frontMatter.title} desc={data.frontMatter.description} href={data.slug}/>)}
      </div>
      
    </main>
  )
}
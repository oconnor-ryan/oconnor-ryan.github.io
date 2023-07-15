import styles from "./page.module.scss";

import Card from '@/components/card';

import { getAllPostData } from "@/lib/blog-post-hander";

export default async function Blog() {

  const posts = await getAllPostData();

  return (
    <main className={styles.blog}>
      <h1>Blogs</h1>
      <div className={styles.cardContainer}>
        {posts.map(data => <Card key={data.id} title={data.frontMatter.title} desc={data.frontMatter.description}/>)}
      </div>
      
    </main>
  )
}
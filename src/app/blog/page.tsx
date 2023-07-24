import { getAllTags, getAllPostData } from "@/lib/blog-post-handler";

import styles from './page.module.scss';

import BlogCardContainer from "@/components/blog-card-container";
import TagList from "@/components/tag-container";


export default function Blog() {

  return(
    <div className={styles.blog}>
      <h1>Welcome to My Blog</h1>
      <h2>You can search for an article using these tags:</h2>
      <div className={styles.tagList}>
        <TagList tags={getAllTags()}/>
      </div>
      <h2>My most recent blog posts...</h2>
      <BlogCardContainer posts={getAllPostData().slice(0, 4)}/>
    </div>
  );
}
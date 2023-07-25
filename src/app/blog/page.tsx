import { getAllTags, getAllPostData } from "@/lib/blog-post-handler";

import styles from './page.module.scss';

import BlogCardContainer from "@/components/blog-card-container";
import TagList from "@/components/tag-container";


export default function Blog() {

  return(
    <div className={styles.blog}>
      <h1>Welcome to My Blog!</h1>
      <h2>
        In this blog, I will mostly focus on writing programming tutorials
        as well as document some of the many programming-related issues I 
        have faced. I may also occasionally post articles related to woodworking.
      </h2>
      <h2>You can search for an article using these tags:</h2>
      <TagList tags={getAllTags()}/>

      <h2>My most recent blog posts...</h2>
      <BlogCardContainer posts={getAllPostData().slice(0, 4)}/>
    </div>
  );
}
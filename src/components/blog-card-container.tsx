import { CSSProperties } from "react";
import styles from "./blog-card-container.module.scss";

import BlogPostCard from "./blog-post-card";
import { PostData, getTagsFromSlug } from "@/lib/blog-post-handler";

export default function BlogCardContainer({posts, css} : {posts: PostData[], css?: CSSProperties}) {
  return <div style={css} className={styles.cardContainer}>
    {posts.map(post => <BlogPostCard key={post.slug} post={post} />)}
  </div>;
}
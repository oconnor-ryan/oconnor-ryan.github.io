import styles from "./blog-post-card.module.scss";
import { PostData } from "@/lib/blog-post-handler";

export default function BlogPostCard({post}: {post: PostData}) {
  return (
    <a className={styles.card} href={`/blog/post/${post.slug}`}>
      <img className={styles.thumbnail} src={post.frontMatter.thumbnailSrc}></img>
      <h4 className={styles.title}>{post.frontMatter.title}</h4>
      <p className={styles.date}>{post.frontMatter.date.toLocaleDateString()}</p>
      <p className={styles.desc} dangerouslySetInnerHTML={{__html: post.frontMatter.description}}></p>
    </a>
  );
}
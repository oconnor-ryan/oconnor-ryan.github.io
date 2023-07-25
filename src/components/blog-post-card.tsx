import styles from "./blog-post-card.module.scss";
import { PostData, getTagsFromSlug } from "@/lib/blog-post-handler";
import TagList from "./tag-container";

export default function BlogPostCard({post}: {post: PostData}) {
  let postTags = getTagsFromSlug(post.slug);

  return (
    <a className={styles.card} href={`/blog/post/${post.slug}`}>
      <img className={styles.thumbnail} src={post.frontMatter.thumbnailSrc}></img>
      <h4 className={styles.title}>{post.frontMatter.title}</h4>
      <p className={styles.date}>{post.frontMatter.date.toLocaleDateString()}</p>
      <p className={styles.desc} dangerouslySetInnerHTML={{__html: post.frontMatter.description}}></p>
      <TagList 
        tags={postTags} 
        css={{
          width: '90%',
          margin: '1em auto', 
          fontSize: '0.7em', 
          padding: '0em', 
          gridTemplateColumns: 'repeat(auto-fit, 150px);'
        }} 
        dontLinkTags={true}
      />
    </a>
  );
}
import styles from "./blog-post-card.module.scss";
import { PostData, getTagsFromSlug } from "@/lib/blog-post-handler";
import TagList from "./tag-container";

export default function BlogPostCard({post}: {post: PostData}) {
  let postTags = getTagsFromSlug(post.slug);

  let thumbnail = post.frontMatter.hasOwnProperty('thumbnailSrc') ? 
    <img className={styles.thumbnail} src={post.frontMatter.thumbnailSrc} alt={post.frontMatter.thumbnailCaption}></img>
    : //if there is no image, display a small "Thumbnail To Be Added" Message
    <div className={styles.thumbnail}>Thumbnail To Be Added</div>
  ;

  return (
    <a className={styles.card} href={`/blog/post/${post.slug}`}>
      {thumbnail}
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
          gridTemplateColumns: 'repeat(auto-fit, 150px)'
        }} 
        dontLinkTags={true}
      />
    </a>
  );
}
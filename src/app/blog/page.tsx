import { getAllTags } from "@/lib/blog-post-handler";

import styles from './page.module.scss';

export default function Blog() {

  return(
    <div className={styles.blog}>
      <h1>Welcome to My Blog</h1>
      <div className={styles.tagList}>
        <h2>You can search for an article using these tags:</h2>
        {getAllTags().map(tag => <a key={tag} href={`./${tag}/1`}>{tag}</a>)}
      </div>
    </div>
  );
}
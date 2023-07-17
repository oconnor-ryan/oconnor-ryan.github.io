import { getAllTags } from "@/lib/blog-post-handler";

import styles from './page.module.scss';

export default function Blog() {

  return(
    <div className={styles.blog}>
      <h1>Welcome to My Blog</h1>
      <div className={styles.tagList}>
        <h2>You can search for an article using these tags:</h2>
        {/* encodeURI is required because many web servers do not allow spaces in URL*/}
        {getAllTags().map(tag => <a key={tag} href={`./${tag}`}>{tag}</a>)}
      </div>
    </div>
  );
}
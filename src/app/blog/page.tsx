import { getAllTags, TagWrapper } from "@/lib/blog-post-handler";

import styles from './page.module.scss';

export default function Blog() {

  return(
    <div className={styles.blog}>
      <h1>Welcome to My Blog</h1>
      <h2>You can search for an article using these tags:</h2>
      <div className={styles.tagList}>
        {/* encodeURI is required because many web servers do not allow spaces in URL*/}
        {getAllTags().map((tagWrapper) => <a key={tagWrapper.tag} href={`./${tagWrapper.urlTag}`}>{tagWrapper.tag}</a>)}
      </div>
    </div>
  );
}
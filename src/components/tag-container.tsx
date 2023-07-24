import { CSSProperties } from 'react';
import styles from './tag-container.module.scss';

import { TagWrapper } from '@/lib/blog-post-handler';

export default function TagList({tags, css}: {tags: TagWrapper[], css?: CSSProperties}) {
  return <div style={css} className={styles.tagList}>
    {tags.map(tagWrapper => <a key={tagWrapper.tag} href={`./${tagWrapper.urlTag}`}>{tagWrapper.tag}</a>)}
  </div>
}
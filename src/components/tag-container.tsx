import { CSSProperties } from 'react';
import styles from './tag-container.module.scss';

import { TagWrapper } from '@/lib/blog-post-handler';
import OutlineButton from './outline-button';

export default function TagList({tags, css}: {tags: TagWrapper[], css?: CSSProperties}) {
  return <div style={css} className={styles.tagList}>
    {tags.map(tagWrapper => <OutlineButton key={tagWrapper.tag} str={tagWrapper.tag} href={tagWrapper.urlTag}/>)}
  </div>
}
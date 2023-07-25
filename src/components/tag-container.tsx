import { CSSProperties } from 'react';
import styles from './tag-container.module.scss';

import { TagWrapper } from '@/lib/blog-post-handler';
import OutlineButton from './outline-button';

export default function TagList({tags, css, activeTag, dontLinkTags}: 
  {
    tags: TagWrapper[], 
    css?: CSSProperties, 
    activeTag?: TagWrapper, //the tag that is highlighted in this tag list

    /* if true, dont wrap <a> around OutlineButtons
      This prevents React hydration errors from occurring as a result
      of wrapping the <a> in Outline Button inside another parent element
      with a <a> tag. For example:

      <a>
        <TagList tags={...}
      </a>

      The above JSX would force NextJS to render using client-side rendering
      and cause a React hydration error. For more information:
      https://nextjs.org/docs/messages/react-hydration-error
    */
    dontLinkTags?: boolean 
  }
) {
  return <div style={css} className={styles.tagList}>
    {
      tags.map(tagWrapper => <OutlineButton 
        key={tagWrapper.tag} 
        str={tagWrapper.tag} 
        href={dontLinkTags ? undefined : `/blog/${tagWrapper.urlTag}`} 
        active={activeTag === tagWrapper}
        interactable={!dontLinkTags}
      />)
    }
  </div>
}
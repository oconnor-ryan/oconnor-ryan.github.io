import {getPost, getSlugsToAllPosts} from '@/lib/blog-post-handler';
import Frame from '@/components/frame';

import styles from './page.module.scss';


//note that this function can only return a JSON object with 
//each key being the names of the dynamic routes for this
//page (the folders with the square brackets []).

//Example: If the directory above this page is named [slug] and the 
//route above it is not dynamic, generateStaticParams should only
//return an Array of JSON objects, with each JSON having one
//key named "slug".

//Code Example: In /app/blog/[slug]/page.tsx:
//  export function generateStaticParams() {
//    return [{slug: 'hi'}, {slug: 'there'}];
//  }
export function generateStaticParams() {
  return getSlugsToAllPosts().map(slug => ({slug: slug}));
}

export default async function Post({params} : {params: {slug: string}}) {

  //add .md extension back to slug to get the correct post.
  let post = await getPost(params.slug);
  return (
    <main className={styles.main}>
      <div className={styles.thumbnail}>
        <Frame 
          src={post.data.thumbnailSrc}
          caption={post.data.thumbnailCaption}
        />
      </div>
      <h1 className={styles.title}>{post.data.title}</h1>
      <p className={styles.description}>{post.data.description}</p>
      <article className={styles.article} dangerouslySetInnerHTML={{__html: post.html}}/>
    </main>
  );
}
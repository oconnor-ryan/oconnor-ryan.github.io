import {getArticleJSXFromSlug, getSlugsToAllPosts, getPostDataFromSlug, PostData, getAllPostData, Post, getTagsFromSlug} from '@/lib/blog-post-handler';

import Frame from '@/components/frame';

import styles from './page.module.scss';
import BlogCardContainer from '@/components/blog-card-container';
import TagList from '@/components/tag-container';


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

function sharesTag(post1: PostData, post2: PostData) {
  if(post1.frontMatter.tags.length == 0 && post2.frontMatter.tags.length == 0) {
    return true;
  }
  
  return post1.frontMatter.tags.some((tag1: string) => post2.frontMatter.tags.find((tag2: string) => tag1 === tag2));
}
function searchForNextRelatedPosts(post: PostData) {
  return getAllPostData().filter((data, i) => {
    if(post.frontMatter.date > data.frontMatter.date && sharesTag(post, data)) {
      return data;
    }
  })
}


export default async function Post({params} : {params: {slug: string}}) {
  let postData = getPostDataFromSlug(params.slug);
  
  return (
    <main className={styles.main}>
      <div className={styles.thumbnail}>
        <Frame 
          src={postData.frontMatter.thumbnailSrc}
          caption={postData.frontMatter.thumbnailCaption}
        />
      </div>
      <h1 className={styles.title}>{postData.frontMatter.title}</h1>
      <p className={styles.description}>{postData.frontMatter.description}</p>
      {await getArticleJSXFromSlug(params.slug, styles.article)}

      <h2>Tags</h2>
      <TagList tags={getTagsFromSlug(postData.slug)}/>

      <h2>Related Posts: </h2>
      <BlogCardContainer posts={searchForNextRelatedPosts(postData)}/>
    </main>
  );
}
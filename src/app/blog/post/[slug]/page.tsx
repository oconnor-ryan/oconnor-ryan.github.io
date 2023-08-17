import {getArticleJSXFromSlug, getSlugsToAllPosts, getPostDataFromSlug, searchForNextRelatedPosts, Post, getTagsFromSlug} from '@/lib/blog-post-handler';
import { generateRSSFeedFiles } from '@/lib/blog-data-handler';

import Frame from '@/components/frame';

import styles from './page.module.scss';
import BlogCardContainer from '@/components/blog-card-container';
import TagList from '@/components/tag-container';
import { Metadata } from 'next';


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
export async function generateStaticParams() {
   /*
    Generates the needed RSS feed files. 

    Note: In development build, this command will be run each time the user visits the /blog page.
    In production, this command will only be called once at build time.

    Weird Bug?: When running 'next build', the RSS feeds will only be generated if 
    the generateStaticParams method does NOT return an empty list
  */
  await generateRSSFeedFiles(); 

  console.log("RSS FEEDS GENERATED!");

  return getSlugsToAllPosts().map(slug => ({slug: slug}));
}

export function generateMetadata({params}: {params: {slug: string}}) : Metadata {
  let postData = getPostDataFromSlug(params.slug)!;
  return {
    title: postData.frontMatter.title,
    description: postData.frontMatter.description
  };
}

export default async function Post({params} : {params: {slug: string}}) {
  let postData = getPostDataFromSlug(params.slug)!;
  
  let postTags = getTagsFromSlug(postData.slug);

  //if there is a thumbnail image, display it in a Frame Component
  let frame = postData.frontMatter.hasOwnProperty("thumbnailSrc") ?
    <div className={styles.thumbnail}>
      <Frame 
        src={postData.frontMatter.thumbnailSrc}
        caption={postData.frontMatter.thumbnailCaption}
      />
    </div>
    :
    <></>
  ;

  let relatedPosts = searchForNextRelatedPosts(postData, 3);

  //if there are no other posts available, tell the user that there are no more posts and
  //that more will be coming soon. Otherwise, display 1-3 other posts
  let relatedPostJSX = relatedPosts.length == 0 ? 
    <div className={styles.textNotInArticle}>There are no other posts! More posts will come very soon!</div>
    : 
    <BlogCardContainer posts={relatedPosts}/>
  ;


  return (
    <main className={styles.main}>
      {frame}
      <h1 className={styles.title}>{postData.frontMatter.title}</h1>
      <p className={styles.description}>{postData.frontMatter.description}</p>
      <p className={styles.textNotInArticle}>Posted: {postData.frontMatter.date.toLocaleDateString()}</p>

      <hr/>
      {await getArticleJSXFromSlug(params.slug, styles.article)}
      <hr/>

      <h2>Thanks For Reading My Post! Here's Some Other Posts You May Like:</h2>
      {relatedPostJSX}

      <h2>Tags Used By This Post</h2>
      <TagList tags={postTags}/>

    </main>
  );
}
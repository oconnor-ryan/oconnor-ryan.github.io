import Frame from "@/components/frame";
import PageNavigator from "@/components/page-navigator";

import { getImageMetaData } from "@/lib/woodgallery-image-handler";

import styles from "./page.module.scss";

export const IMAGES_PER_PAGE = 20;


export default function WoodGallery({params}: {params: {page: string}}) {
  let allImageData = getImageMetaData();
  let numPages = Math.ceil(allImageData.length / IMAGES_PER_PAGE);
  
  
  //if going to /woodgallery, the params json will not have the
  // "page" property because that is only added in pages under
  // the [page] directory. If params.pages is not defined, the
  //page number is 1
  let pageNum = !params.hasOwnProperty('page') ? 1 : Number(params.page);

  let start = IMAGES_PER_PAGE * (pageNum - 1); 

  let end = start + IMAGES_PER_PAGE;


  let imageData = allImageData.slice(start, end);

  // id field is required to fill out the key field in Frame.
  // The key is required because the Frames are from a list.

  return (
    <main className={styles.gallery}>
      <h1>Wood Gallery</h1>
      <h2>
        Here are some carvings, intarsias, and other wooden items
        that I have made.
      </h2>
      <div className={styles.pictureContainer}>
        {imageData.map((item) => <Frame key={item.imageUrl} src={item.imageUrl} caption={item.caption}/>)}
      </div>
      <PageNavigator pageNum={pageNum} numPages={numPages}/>
    </main>
  )
}
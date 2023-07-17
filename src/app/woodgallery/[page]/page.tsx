import Frame from "@/components/frame";
import { getImageMetaData } from "@/lib/woodgallery-image-handler";

import styles from "./page.module.scss";

const imagesPerPage = 5;

export function generateStaticParams() {
  let imageData = getImageMetaData()
  let numPages = Math.ceil(imageData.length / imagesPerPage);

  return Array.from(
    {length: numPages},
    (_, i) => String(i + 1)
  )
}

export default function WoodGallery({params}: {params: {page: string}}) {
  let allImageData = getImageMetaData();
  let numPages = Math.ceil(allImageData.length / imagesPerPage);
  
  let pageNum = Number(params.page);

  let start = pageNum * (imagesPerPage - 1);
  let end = start + imagesPerPage;


  let imageData = allImageData.slice(start, end);

  let prevPageNum = pageNum - 1;
  let nextPageNum = pageNum + 1;


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
      <div className={styles.pageNavContainer}>
        {/* 
        If user is on first page, replace the previous page 
        button with an empty div so that flexbox correctly
        spaces out elements correctly.
        */}
        {prevPageNum > 0 ? <a className={styles.arrow} href={"../" + prevPageNum}><button>&lt;</button></a> : <div></div>}

        <p className={styles.pageNumber}>Page {params.page}</p>

        {/* 
        If user is on last page, replace the next page 
        button with an empty div so that flexbox correctly
        spaces out elements correctly.
        */}
        {nextPageNum <= numPages ? <a className={styles.arrow} href={"../" + nextPageNum}><button>&gt;</button></a> : <div></div>}


      </div>
    </main>
  )
}
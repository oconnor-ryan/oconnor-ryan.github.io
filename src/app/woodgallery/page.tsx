import Frame from "@/components/frame";

import styles from "./page.module.scss";

export default function WoodGallery() {

  let list: String[] = [
    "hummingbird.jpg",
    "50th-aniversary.jpg",
    "bird-with-hat.jpg",
    "moe.jpg",
    "charlie.jpg",
    "dolphin-on-wave.jpg",
    "sox.jpg",
  ];

  // id field is required to fill out the key field in Frame.
  // The key is required because the Frames are from a list.

  let pictureSrcs: {src: string, id: number}[] = [];
  for(let i = 0; i < list.length; i++) {
    pictureSrcs.push({src: "/images/woodprojects/" + list[i], id: i});
  }

  return (
    <main className={styles.gallery}>
      <h1>Gallery</h1>
      <h2>
        Here are some carvings, intarsias, and other wooden items
        that I have made.
      </h2>
      <div className={styles.pictureContainer}>
        {pictureSrcs.map((item) => <Frame key={item.id} src={item.src}/>)}
      </div>
    </main>
  )
}
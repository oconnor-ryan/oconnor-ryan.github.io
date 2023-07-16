import Frame from "@/components/frame";

import styles from "./page.module.scss";

export default function WoodGallery() {

  let list: Array<{image: string, desc?: string}> = [
    {image: "hummingbird.jpg"},
    {image: "50th-aniversary.jpg", desc: "A Gift For My Grandparents"},
    {image: "bird-with-hat.jpg", desc: "One Of My First Carvings"},
    {image: "moe.jpg", desc: "Moe The Black Lab"},
    {image: "charlie.jpg", desc: "Charlie The Boxer"},
    {image: "dolphin-on-wave.jpg"},
    {image: "sox.jpg", desc: "Sox The Cat Inside A Sox Sock!"},
    {image: "chessboard-top.jpg", desc: "A Full Chess Set"},
    {image: "chessboard-side.jpg", desc: "Side View Of Chess Set"},
    {image: "gavel.jpg", desc: "A Gavel Made Of Canary And Maple Wood"},

  ];

  // id field is required to fill out the key field in Frame.
  // The key is required because the Frames are from a list.

  let pictureSrcs: {id: number, src: string, desc?: string}[] = [];
  for(let i = 0; i < list.length; i++) {
    pictureSrcs.push({id: i, src: "/assets/images/woodprojects/" + list[i].image, desc: list[i].desc});
  }

  return (
    <main className={styles.gallery}>
      <h1>Wood Gallery</h1>
      <h2>
        Here are some carvings, intarsias, and other wooden items
        that I have made.
      </h2>
      <div className={styles.pictureContainer}>
        {pictureSrcs.map((item) => <Frame key={item.id} src={item.src} caption={item.desc}/>)}
      </div>
    </main>
  )
}
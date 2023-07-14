import styles from "./frame.module.scss";

export default function Frame({src, caption} : {src: String, caption?: String | undefined}) {
  let captionElement = caption === undefined ? <p></p> : <p className={styles.caption}>{caption}</p>;
  return (
    <div className={styles.pictureFrame}>
      <img className={styles.picture} src={src as string}></img>
      {captionElement}
    </div>
    
  )
}

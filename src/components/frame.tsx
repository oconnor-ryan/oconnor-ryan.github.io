import styles from "./frame.module.scss";

export default function Frame({src, caption} : {src: string, caption?: string | undefined}) {
  return (
    <div className={styles.frame}>
      <div className={styles.pictureContainer}>
        <img className={styles.picture} src={src} alt={caption}></img>
      </div>
      {caption === undefined ? null : <p className={styles.caption}>{caption}</p>}
    </div>
    
  )
}

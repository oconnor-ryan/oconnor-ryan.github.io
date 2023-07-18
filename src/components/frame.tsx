import styles from "./frame.module.scss";

export default function Frame({src, caption, href, newTab} : {src: string, caption?: string | undefined, href?: string | undefined, newTab?: boolean | undefined}) {
  let frameImage = href ? 
    <a href={href} target={newTab ? "_blank" : ""} className={styles.pictureContainer}>
      <img className={styles.picture} src={src} alt={caption}></img>
    </a> 
    :
    <div className={styles.pictureContainer}>
      <img className={styles.picture} src={src} alt={caption}></img>
    </div>;

  return (
    <div className={styles.frame}>
      {frameImage}
      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
    
  )
}

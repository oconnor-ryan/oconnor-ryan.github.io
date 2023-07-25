import styles from "./modal-image.module.scss";

export default function ModalImage({imgSrc, caption} : {imgSrc: string, caption: string}) {
  return <div className={styles.modal}>
    <span className={styles.close}>&times;</span>
    <img className={styles.image} src={imgSrc}></img>
    <div className={styles.caption}>{caption}</div>
  </div>
}
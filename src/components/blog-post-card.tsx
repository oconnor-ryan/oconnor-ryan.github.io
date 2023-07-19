import styles from "./blog-post-card.module.scss";


export default function BlogPostCard({ title, desc, date, imgSrc, href }: {title: string, desc: string, date: Date, imgSrc: string, href?: string}) {
  let cardBody = (
    <>
      {/*<div className={styles.thumbnail}><Frame src={imgSrc}/></div>*/}
      <img className={styles.thumbnail} src={imgSrc}></img>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.date}>Date Posted: {date.toLocaleDateString()}</p>
      <p className={styles.desc} dangerouslySetInnerHTML={{__html: desc}}></p>
    </>
  );

  if(href) {
    return (
      <a href={href} className={styles.card}>
        {cardBody}
      </a>
    )
  }
  return (
    <div className={styles.card}>
     {cardBody}
    </div>
  );
}
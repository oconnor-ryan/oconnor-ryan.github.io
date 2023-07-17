import styles from "./card.module.scss";

export default function Card({ title, desc, href }: {title: string, desc: string, href?: string}) {
  let cardBody = (
    <>
      <h4 className={styles.title}>{title}</h4>
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
import styles from "./card.module.scss";

export default function Card({ title, desc }: {title: string, desc: string}) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.desc} dangerouslySetInnerHTML={{__html: desc}}></p>
    </div>
  );
}
import styles from "./card.module.scss";

export default function Card({ title, desc, href, subtitle, list }: {title: string, desc: string, href?: string, subtitle?: string, list?: string[]}) {
  let cardBody = (
    <>
      <div className={styles.title}>
        <h4>{title}</h4>
        {subtitle ? <h5>{subtitle}</h5> : <></>}

      </div>
      <div className={styles.desc}>
        <p dangerouslySetInnerHTML={{__html: desc}}></p>
        {list ? <ul>{list.map((r,i) => <li key={i}>{r}</li>)}</ul> : <></>}
      </div>

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
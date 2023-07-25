import styles from './outline-button.module.scss';

export default function OutlineButton({str, href} : {str: string, href?: string}) {
  if(href) {
    return <a href={href} className={styles.button}>
      {str}
    </a>
  } else {
    return <div className={styles.button}>
      {str}
    </div>
  }
}
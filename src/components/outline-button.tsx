import styles from './outline-button.module.scss';

export default function OutlineButton({str, active, href, interactable} : {
  str: string, 
  active?: boolean, 
  href?: string, //if an href is specified, the button becomes an anchor and links to that href
  interactable?: boolean //interactable determines if button will highlight itself when hovered over
}) {
  if(interactable === undefined) {
    interactable = true;
  }

  if(href) {
    return <a href={href} className={`${styles.button} ${interactable ? styles.interact : ""} ${active ? styles.active : ""}`}>
      {str}
    </a>
  } else {
    return <div className={`${styles.button} ${interactable ? styles.interact : ""}`}>
      {str}
    </div>
  }
}
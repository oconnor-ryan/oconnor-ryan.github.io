import styles from "./footer-styles.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contentWrapper}>
        <div id="contact-info" className={styles.contactInfo}>
          <h1>Contact Info</h1>
          <ul className={styles["social-container-footer"]}>
            {/* target="_blank" tells browser to open link in new tab. */}
            <li>
              <a href="mailto:oconnor.ryan.m@proton.me">
                <div className={`${styles.icons} ${styles.iconEmail}`}></div>
                <div className={styles.iconDesc}>oconnor.ryan.m@proton.me</div>
              </a>
            </li>
            <li>
              <a href="https://github.com/oconnor-ryan" target="_blank">
                <div className={`${styles.icons} ${styles.iconGithub}`}></div> 
                <div className={styles.iconDesc}>Github</div>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ryan-o-connor-5615b326a/" target="_blank">
                <div className={`${styles.icons} ${styles.iconLinkedin}`}></div>
                <div className={styles.iconDesc}>LinkedIn</div>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.nextjs}>
          <p>This website was made using:</p>
          <a href="https://nextjs.org"><div className={styles.nextjsLogo}></div></a>
        </div>
      </div>

      <div className={styles.copyright}>&copy; Ryan O'Connor 2023</div>
    </footer>
  )
}
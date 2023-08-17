import Script from "next/script";
import styles from "./footer-styles.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={`${styles.backToTop} ${styles.noJS}`} href="./#main-page-wrapper">&#8593;</a>
      <button className={`${styles.backToTop} ${styles.js}`}>&#8593;</button>

      <div className={styles.contentWrapper}>
        <div id="contact-info" className={styles.contactInfo}>
          <h2>Contact Info</h2>
          <ul className={styles["social-container-footer"]}>
            {/* target="_blank" tells browser to open link in new tab. */}
            <li>
              <a href="mailto:oconnor.ryan.m@proton.me">
                <div className={`${styles.icons} ${styles.iconEmail}`}></div>
                <div className={styles.iconDesc}>Email</div>
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

        <hr/>

        <div className={styles.sitemap}>
          <h2>Site Map</h2>
          <ul className={styles.links}>
            <li><a href="/" className={styles.title}>About</a></li>
            <li><a href="/woodgallery" className={styles.title}>Wood Gallery</a></li>
            <li><a href="/blog" className={styles.title}>Blog</a></li>
            
            <li><a href="/feed/rss.xml" className={styles.title}>RSS Feed</a></li>
            <li><a href="/feed/rss.json" className={styles.title}>RSS JSON Feed</a></li>
            <li><a href="/feed/atom.xml" className={styles.title}>Atom Feed</a></li>
          </ul>
        </div>

        <hr/>

        <div className={styles.nextjs}>
          <p>This website was made using:</p>
          <a href="https://nextjs.org"><div className={styles.nextjsLogo}></div></a>
        </div>

        <hr/>
      </div>

      <div className={styles.copyright}>&copy; Ryan O'Connor 2023</div>
      
      <Script 
        id="smooth-scroll"
        dangerouslySetInnerHTML={{
          __html:`
            const backToTop = document.getElementsByClassName("${styles.backToTop} ${styles.js}")[0];
            const backToTopNoJS = document.getElementsByClassName("${styles.backToTop} ${styles.noJS}")[0];

            backToTopNoJS.style.display = 'none'; //remove the noJS version of the backToTop button here
            backToTop.style.display = 'block'; //make the JS version of the backToTop button visible

            //use smooth scrolling to move to top of window when pressing the button
            backToTop.addEventListener('click', (ev) => {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            });
          `
        }}
      />
    </footer>
  )
}
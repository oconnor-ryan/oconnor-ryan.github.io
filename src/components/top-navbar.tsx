import Script from "next/script";
import styles from "./top-navbar-styles.module.scss";

export default function TopNavbar()  {
  return (
    <header className={styles.header}>
      <div className={styles.drawerTopContainer}></div>
      <a href="/" className={styles["logo-container"]}>
        <h1 className={styles.name}>Ryan O'Connor</h1>
      </a>
        
      <nav className={styles.nav}>
        <a className={styles.link} href="/#about">About</a>
        <a className={styles.link} href="/#projects">Projects</a>
        <a className={styles.link} href="/#resume">Resume</a>
        <a className={styles.link} href="/blog">Blog</a>
        <a className={styles.link} href="/woodgallery">Wood Gallery</a>
        {/*<a className={styles.link} href="/games">Games</a>*/}
        <div className={styles["social-container"]}>
          {/* target="_blank" tells browser to open link in new tab. */}
          <a href="mailto:oconnor.ryan.m@proton.me"><div className={`${styles.icons} ${styles.iconEmail}`}></div></a>
          <a href="https://github.com/oconnor-ryan" target="_blank"><div className={`${styles.icons} ${styles.iconGithub}`}></div></a>
          <a href="https://www.linkedin.com/in/ryan-o-connor-5615b326a/" target="_blank"><div className={`${styles.icons} ${styles.iconLinkedin}`}></div></a>
        </div>
      </nav>
      
      <div className={styles.hamburger}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <Script id="display-nav-dropdown"
        dangerouslySetInnerHTML={ {
          __html: `
          const header = document.getElementsByClassName('${styles.header}')[0];
          const hamburger = document.getElementsByClassName('${styles.hamburger}')[0];
          const nav = document.getElementsByClassName('${styles.nav}')[0];
          let showDropdown = false;

          hamburger.addEventListener("click", (ev) => {
            showDropdown = !showDropdown;

            if(showDropdown) {
              header.classList.add("${styles.dropdown}");
              hamburger.classList.add("${styles.x}");

            } else {
              header.classList.remove("${styles.dropdown}");
              hamburger.classList.remove("${styles.x}");

            }
          });
        `
        }}
      />

    </header>
  );
}
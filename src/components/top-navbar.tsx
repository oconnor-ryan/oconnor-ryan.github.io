import Script from "next/script";
import styles from "./top-navbar-styles.module.scss";

export default function TopNavbar()  {
  return (
    <header className={styles.header}>
      <div className={styles["social-container"]}>
        {/* target="_blank" tells browser to open link in new tab. */}
        <a href="mailto:oconnor.ryan.m@proton.me"><img src="iconmonstr-email-10.svg" /></a>
        <a href="https://github.com/oconnor-ryan" target="_blank"><img src="/iconmonstr-github-4.svg" /></a>
        <a href="https://www.linkedin.com/in/ryan-o-connor-5615b326a/" target="_blank"><img src="/iconmonstr-linkedin-4.svg" /></a>
      </div>
      
      <a href="/" className={styles["logo-container"]}>
        <h1 className={styles.name}>Ryan O'Connor</h1>
      </a>
        
      <nav className={styles.nav}>
        <a href="/#about">About</a>
        <a href="/#education">Education</a>
        <a href="/#experience">Experience</a>
        <a href="/blog">Blog</a>
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

            } else {
              header.classList.remove("${styles.dropdown}");
            }
          });
        `
        }}
      />

    </header>
  );
}
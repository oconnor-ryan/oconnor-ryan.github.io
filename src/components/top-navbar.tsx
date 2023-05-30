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

      <div className={styles["nav-wrapper"]}>
        <div className={styles.hamburger}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={styles.nav}>
          <a href="/#about">About</a>
          <a href="/#education">Education</a>
          <a href="/#experience">Experience</a>
          <a href="/blog">Blog</a>
        </nav>
      </div>
      
    </header>
  );
}
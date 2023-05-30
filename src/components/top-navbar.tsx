import styles from "./top-navbar-styles.module.scss";

export default function TopNavbar()  {
  return (
    <header className={styles.header}>
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
          <a href="/blog">Blog</a>
          <a href="/blog">GitHub</a>
          <a href="/blog">Experience</a>
        </nav>
      </div>
      
    </header>
  );
}
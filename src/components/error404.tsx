import styles from "./error.module.scss";

export default function Err404() {
  return (
    <div className={styles.errorPage}>
      <h1>404 - Page Not Found!</h1>
    </div>
  );
}
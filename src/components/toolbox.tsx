import styles from "./toolbox.module.scss";

export default function Toolbox() {
  return (
    <div className={styles.toolboxContainer}>
      <img className={styles.toolbox} src="/toolbox.svg"></img>
      <ul className={styles.skillContainer}>
        <li>HTML</li>
        <li>CSS</li>
        <li>SASS</li>
        <li>Javascript</li>
        <li>Typescript</li>
        <li>NextJS</li>
        <li>PHP</li>
        <li>NodeJS</li>
        <li>MariaDB / MySQL</li>
        <li>XCode for iOS</li>
        <li>Android Studio</li>
        <li>Flutter</li>
      </ul>
    </div> 
  );
}

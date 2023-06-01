import Image from 'next/image'
import styles from './page.module.scss'

//page is the equivalent to index.html on Apache web server
export default function Home() {
  return (
    <main className={styles.main}>
      <div id="about">
        <h1>About</h1>
      </div>

      <div id="education">
        <h1>Education</h1>
      </div>

      <div id="experience">
        <h1>Experience</h1>
      </div>
    </main>
  )
}

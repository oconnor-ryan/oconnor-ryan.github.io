import Image from 'next/image'
import styles from './page.module.scss'

//page is the equivalent to index.html on Apache web server
export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hi there!</h1>
      <a href="/blog">Blog Page</a>
    </main>
  )
}

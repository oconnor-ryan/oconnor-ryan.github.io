import Script from 'next/script'
import styles from './page.module.scss'

//page is the equivalent to index.html on Apache web server
export default function Home() {
  return (
    <main className={styles.main}>
      <div id="about">
        <h1>About</h1>
        <canvas id="hero-background-canvas" width="400px" height="400px"></canvas>
      </div>

      <div id="education">
        <h1>Education</h1>
      </div>

      <div id="experience">
        <h1>Experience</h1>
      </div>

      <div id="resume-pdf">
        <h1>My Resume in PDF form!</h1>
        <object className={styles["resume-pdf-wrapper"]} data="/Resume.pdf" type="application/pdf" width="100%" height="700px">
          <p>Cannot display PDF file. <a href="/Resume.pdf">Download my resume instead!</a></p>
        </object>
      </div>

      <Script src="/hero-section-canvas-handler.js"></Script>
    </main>
  )
}

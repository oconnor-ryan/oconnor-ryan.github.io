import Script from 'next/script'
import styles from './page.module.scss'

//page is the equivalent to index.html on Apache web server
export default function Home() {
  return (
    <main className={styles.main}>
      <div id="about">
        <h1>About</h1>
        <canvas className={styles.heroBackgroundCanvas} id="hero-background-canvas"></canvas>
      </div>

      <div id="skills">
        <h1>My Toolbox</h1>
        <img src="toolbox.svg" className={styles.toolbox}></img>
      </div>

      <div id="education">
        <h1>Education</h1>
      </div>

      <div id="experience">
        <h1>Experience</h1>
      </div>

      {/* 
        Note that the PDF will embed nicely on Desktop, but not on most mobile browsers.
        On Safari and Firefox iOS browsers, only the first page is displayed as an image, making 
        downloading the PDF file difficult.
      */}
      <div id="resume-pdf">
        <h1>My Resume in PDF form!</h1>
        <a href="/Resume.pdf">
          <object className={styles["resume-pdf-wrapper"]} data="/Resume.pdf" type="application/pdf">
            <p>Cannot display PDF file. Download my resume instead!</p>
          </object>
        </a>
        
      </div>

      <Script src="/hero-section-canvas-handler.js"></Script>
    </main>
  )
}

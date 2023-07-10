import Script from 'next/script'
import Toolbox from '@/components/toolbox';
import styles from './page.module.scss'

//page is the equivalent to index.html on Apache web server
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hook}>
        <div className={styles.profilePicBackground}>
          <img className={styles.profilePic} src='/me.jpg'/>
        </div>
        <p className={styles.pitch}>
          Just as a craftsman knows the tools of their trade,
          I know the tools to build your dream websites and mobile
          apps. I aspire to build great fullstack web and mobile
          applications for a variety of industries.
        </p>
      </div>
      <div id="about">
        <h1>About</h1>
        <canvas className={styles.heroBackgroundCanvas} id="hero-background-canvas"></canvas>
      </div>

      <div id="skills">
        <h1>My Toolbox</h1>
        <Toolbox />    
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

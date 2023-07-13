import Script from 'next/script'
import Toolbox from '@/components/toolbox';
import Card from '@/components/card';

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
          Just as a carpenter uses their tools and expertise to build 
          beautiful buildings, I use my tools and expertise to build 
          beautiful websites and mobile apps. 
        </p>
      </div>
      <div id="about" className={styles.aboutWrapper}>
        <h1>Who Am I?</h1>

        <div className={styles.cardContainer}>
          <Card title="College Student" desc={`I'm majoring in Computer Science
          and minoring in Computer Engineering at Purdue University Northwest.\n 
          I will get my Bachelor's degree in 2024!`} />

          <Card title="Full Stack Developer" desc={`I build websites and mobile
          apps from the ground up and can manage parts of a web/mobile app, 
          from database management via SQL to writing backend server-side code to 
          designing the look-and-feel of apps.`} />

          <Card title="Woodworker" desc={`As a hobby, I carve caricatures, turn vases
          and chess pieces, create intarsia, and do scrollwork.\n Check out my 
          <a href='/woodgallery'> woodworking gallery</a> sometime!`} />

          <Card title="Blogger" desc={`I made a blog on this site to document
          the tricks I have learned over the years relating to programming.\n
          It also serves as a place for me to look back upon when I stumble
          across a problem I've previously solved.`}/>

        </div>
      </div>

      <div id="skills" className={styles.skillWrapper}>
        <h1>My Toolbox</h1>
        <Toolbox />    
      </div>

      <div id="projects" className={styles.projectWrapper}>
        <h1>Projects</h1>
        <div className={styles.testBorder}>
          <div className={styles.testBorderContent}></div>
        </div>
      </div>

      {/* 
        Note that the PDF will embed nicely on Desktop, but not on most mobile browsers.
        On Safari and Firefox iOS browsers, only the first page is displayed as an image, making 
        downloading the PDF file difficult.
      */}
      <div id="resume">
        <h1>My Resume in PDF form!</h1>
        <a href="/Resume.pdf">
          <object className={styles["resume-pdf-wrapper"]} data="/Resume.pdf" type="application/pdf">
            <p>Cannot display PDF file. Download my resume instead!</p>
          </object>
        </a>
        
      </div>
    </main>
  )
}

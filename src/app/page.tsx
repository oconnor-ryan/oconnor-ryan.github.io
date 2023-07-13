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
      <div id="about" className={styles.aboutWrapper}>
        <h1>About</h1>

        <h3>Who Am I?</h3>
        <p className={styles.aboutDesc}>
          I am a senior college student majoring in Computer
          Science and minoring in Computer Engineering. For
          my profession, I build websites and mobile
          apps from the ground up and have some degree of skill
          in managing all parts of a web/mobile app, from database
          management via SQL to writing backend server-side code to 
          designing the frontends of apps. I also like developing 
          cross-platform apps that can run on any OS using tools like
          Flutter.
        </p>

        <h3>Why Full-Stack Development?</h3>
        <p className={styles.aboutDesc}>
          I like fullstack development because it is the easiest
          way to share my applications to the largest possible
          number of people. I can create one website that can 
          viewed and interacted with by anyone who has a browser.
        </p>

        <h3>What do I do for fun?</h3>
        <p className={styles.aboutDesc}>
          Some of my hobbies include playing video games, woodworking, 
          and self-hosting. My favorite types of woodworking are caricature 
          carvings, scrollwork, and intarsia. For self-hosting, I've 
          recently set up a home server with Debian 12 for running my
          own Nextcloud instance for file syncronization for all of my
          devices. I've also recently started blogging on this site, 
          partially to share the things I have learned to you and 
          partially so that I have to spend hours piecing together 
          how to solve a problem I already solved 3 months prior.
        </p>
      </div>

      <div id="skills" className={styles.skillWrapper}>
        <h1>My Toolbox</h1>
        <Toolbox />    
      </div>

      <div id="education" className={styles.educationWrapper}>
        <h1>Education</h1>
        <div className={styles.educationContentBorder}>
          <div className={styles.educationContent}></div>
        </div>
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

      <Script src="/main-page.js"></Script>
    </main>
  )
}

import Toolbox from '@/components/toolbox';
import Card from '@/components/card';
import Frame from '@/components/frame';


import styles from './page.module.scss'

//page is the equivalent to index.html on Apache web server
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hook}>
        <div className={styles.profilePicBackground}>
          <img className={styles.profilePic} src='/assets/images/me.jpg'/>
        </div>
        <p className={styles.pitch}>
          Just as a carpenter uses their tools and expertise to build 
          beautiful buildings, I use my tools and expertise to build 
          beautiful websites and mobile apps. 
        </p>
      </div>

      <div id="about" className={styles.aboutWrapper}>
        <h1>Who Am I?</h1>
        <h2>My name is Ryan O'Connor, and I am a...</h2>

        <div className={styles.cardContainer}>
          <Card title="College Student" desc={`I'm majoring in Computer Science
          and minoring in Computer Engineering at Purdue University Northwest.<br><br> 
          I will get my Bachelor's degree in 2024!`} />

          <Card title="Full Stack Developer" desc={`I build websites and mobile
          apps from the ground up and can manage parts of a web/mobile app, 
          from database management via SQL to writing backend server-side code to 
          designing the look-and-feel of apps.`} />

          <Card title="Woodworker" desc={`As a hobby, I carve caricatures, turn vases
          and chess pieces, create intarsia, and do scrollwork.<br><br> Check out my 
          <a href='/woodgallery'> woodworking gallery</a> sometime!`} />

          <Card title="Blogger" desc={`I made a blog on this site to document
          the tricks I have learned over the years relating to programming.<br><br>
          It also serves as a place for me to look back upon when I stumble
          across a problem I've previously solved.<br><br>
          Check out my <a href="/blog">blog here!</a>`}/>

        </div>
      </div>

      <div id="skills" className={styles.skillWrapper}>
        <h1>My Toolbox</h1>
        <h2>Here are the tools I use for web and mobile development:</h2>
        <Toolbox />    
      </div>

      <div id="projects" className={styles.projectWrapper}>
        <h1>Projects</h1>
        <h2>
          This website (<a href="https://github.com/oconnor-ryan" target="_blank">source code here</a>) 
          is not the only project I have worked on. 
          Here are some other projects that I have done:
        </h2>

        <div className={`${styles.cardContainer} ${styles.projects}`}>
          <Card title={`AtoB Mobility`} desc={`Tools Used: AWS, Linux, NodeJS
          HTML, CSS, Javascript, MySQL, Flutter<br><br>
          Me and a team of 3 other people are currently building a startup company
          called AtoB Mobility that will serve as a ride-sharing service that allows
          drivers to pickup multiple passengers going to the same or similar destination,
          reducing the cost of each trip. I currently helping with hosting the web app via
          Amazon Web Services and building our mobile app using Flutter so we can deploy it
          to iOS and Android.`}/>

          <Card title={`Group Finder Website`} desc={`Tools Used: Javascript, PHP, AWS, MariaDB, Linux<br><br>
          For a project in college, me and two other classmates built a web app where users
          can search for people to work on school projects based on the skills that they have.
          I helped write much of the server-side logic, designed the database schema for the 
          website, and hosted it on AWS on an EC2 instance.`}/>

          <Card title={`WebGL Rendering Engine`} desc={`Tools Used: Typescript, WebGL<br><br>
          I designed a basic rendering engine for WebGL that allows a developer to render
          3D models and textures using only a few lines of code.<br><br>
          Check out the project 
          <a href="https://github.com/oconnor-ryan/ryrender" target="_blank">here on my Github &#8594;</a>`}/>

        </div>
      </div>

      <h1>Resume</h1>
      <div className={styles.resumeWrapper}>
        <Frame 
          src="/assets/images/Resume.jpg" 
          caption="View My Resume By Clicking The Image Above!" 
          href="/assets/Resume.pdf"
          newTab={true}
        />
      </div>
      
      
    </main>
  )
}

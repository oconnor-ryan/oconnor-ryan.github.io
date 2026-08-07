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
          <Card 
            title="Software Engineer" 
            desc={`I can build websites and mobile
                  apps from the ground up. This includes:`} 
            list={[
              "Creating and managing infrastructure on AWS or Azure",
              "Designing databases schemas",
              "Implementing a nice look-and-feel for websites",
              "Utilizing backend code and APIs to provide services for end-users"


            ]}
          />



          <Card title="College Graduate" desc={`I've received my Bachelor of Science Degree
          from Purdue University Northwest. I majored in Computer Science and minored in Computer Engineering.`} />

          
          <Card title="Woodworker" desc={`As a hobby, I carve caricatures, turn vases
          and chess pieces, create intarsia, and do scrollwork.<br><br> 
          Check out my <a href='/woodgallery'>woodworking gallery</a> sometime!`} />

          <Card title="Blogger" desc={`I made a blog on this site to document
          the tricks I have learned over the years relating to programming as well 
          as talk about my woodworking hobby.<br><br>
          Check out my <a href="/blog">blog here!</a>`}/>

        </div>
      </div>

      <div id="skills" className={styles.skillWrapper}>
        <h1>My Toolbox</h1>
        <h2>Here are the tools I use for web and mobile development:</h2>
        <Toolbox />    
      </div>

      <div id="experience" className={styles.experienceWrapper}>
        <h1>Experience</h1>
        <h2>Here is my work experience relating to software engineering:</h2>

        <div className={`${styles.cardContainer} ${styles.projects}`}>

          <Card 
            title={`Dimenso`} 
            subtitle={`Software Engineer; October 2025 to Present`} 

            desc={`Tools Used: AWS, PostgreSQL, Python,
            React, FastAPI, LiveKit, OpenAI, Clerk<br><br>

            I'm working at a AI company that allows scientists to easily capture lab data during experiments and perform data analysis
            upon that collected data.`}
            list={[
              "I've been redesigning Dimenso's AWS infrastructure to comply with the SOC 2 security framework.",
              "I conduct access reviews and track changes to job roles to ensure that all employees have appropriate access to Dimenso resources.",
              "I've utilized LiveKit and OpenAI to allow Dimenso's AI lab assistant to respond to commands and collect lab data.",
              "On our API service, I've implemented file sharing for Dimenso's users, as well as user authentication using Clerk."
            ]}
            href="https://www.dimenso.ai/"
          />

          <Card 
            title={`WeClub`} 
            subtitle={`Cloud Engineer; June 2026 to August 2026`} 

            desc={`Tools Used: AWS, Kubernetes, Docker,
            MySQL, MongoDB, Azure<br><br>

            I successfully migrated a Kubernetes cluster and a React website from Azure to AWS.`}
            list={[
              "I setup AWS EKS and adjusted WeClub's Kubernetes manifest files to work with AWS.",
              "I configured AWS EKS to allow certain Kubernetes services to store user files in a S3 bucket.",
              "I utilized AWS CloudFront and a S3 bucket to host WeClub's website.",
              "I recovered data stored on VHD files used by the MySQL and MongoDB instances hosted on Azure, and migrated it into the databases on AWS EKS."
            ]}
            href="https://www.linkedin.com/company/weclubconnect/about/"
          />

          <Card 
            title={`Movelz`} 
            subtitle={`Volunteer Full Stack Developer; June 2023 to September 2025`} 

            desc={`Tools Used: AWS, Firebase, ExpressJS,
            NodeJS, Javascript, MySQL, Flutter<br><br>

            I was part of a team of former classmates who built a startup company
            called AtoB Mobility Incorporated. Together, we created Movelz, a ride-sharing service.
            `}
            list={[
              "I helped design, deploy, and maintain our API service on AWS",
              "I utilized Stripe to manage payments.",
              "I assisted our front-end developer team with utilizing Firebase on our mobile app for user authentication."
            ]}
            href="https://www.linkedin.com/company/movelz/about/"
          />
        </div>
      </div>


      <div id="projects" className={styles.projectWrapper}>
        <h1>Projects</h1>
        <h2>
          This website (<a href="https://github.com/oconnor-ryan" target="_blank">source code here</a>) 
          is not the only project I have worked on. 
          Here are some other projects that I have done:
        </h2>

        <div className={`${styles.cardContainer} ${styles.projects}`}>

          <Card title={`End-To-End Encrypted Messaging Web App`} desc={`Tools Used: Javascript, Web Cryptography API,
          NodeJS, ExpressJS, WebSocket, WebRTC, VoIP<br><br>
          A full-stack web application created for my senior design project where users can create chatrooms
          and send text, images, and files to other users using their browsers. All messages are end-to-end encrypted and can be
          sent to other users even if they are offline. <br><br> 
          It utilized a modified version of the 
          X3DH key agreement algorithm to allow users to agree on a specific AES cryptography key to use without sending
          that key to the API server. The web app can also perform 1-on-1 video calls between 2 users using WebRTC.
          <br><br>
          Check out the project
          <a href="https://github.com/oconnor-ryan/E2E2" target="_blank">here on my Github &#8594;</a>`}/>

          <Card title={`3D Printing Web App`} desc={`Tools Used: Typescript, NextJS, .NET, ReactJS<br><br>
          During college, I helped 2 members of Purdue Northwest's Additive Manufacturing Club to design and
          build a web app where users can request to have 3D parts printed for them by the club. Users
          can place an order by providing what filaments they want to use, an SDL model, and how many to print.
          <br><br>
          These orders can then be tracked by members of the 
          club and they can schedule when to print the parts from certain orders. These members can also
          mark orders as complete or reject them.`}/>

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

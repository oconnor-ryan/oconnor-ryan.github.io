import Script from "next/script";
import styles from "./toolbox.module.scss";

export default function Toolbox() {
  return (
    <div id="toolboxContainer" className={styles.toolboxContainer}>
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
        <li>Linux</li>
        <li>AWS</li>
        <li>Git</li>
        <li>MariaDB / MySQL</li>
        <li>XCode for iOS</li>
        <li>Android Studio</li>
        <li>Flutter</li>
      </ul>
      <Script id="toggle-toolbar"
        dangerouslySetInnerHTML={ {
          __html: `
          const toolboxContainer = document.getElementById("toolboxContainer");
          const toolboxImage = toolboxContainer.getElementsByClassName("${styles.toolbox}")[0];
          const skillContainer = toolboxContainer.getElementsByClassName("${styles.skillContainer}")[0];


          let willBeUpsideDown = false;
          let currentlyUpsideDown = willBeUpsideDown;
          let transitionComplete = true;
          
          
          let callback = (entries, observer) => {
            entries.forEach((entry) => {
              if(entry.target == toolboxContainer) {
                willBeUpsideDown = entry.isIntersecting;
                if(!transitionComplete) {
                  return;
                }

                if(currentlyUpsideDown == willBeUpsideDown) {
                  return;
                }

                console.log(willBeUpsideDown);

                transitionComplete = false;

                if(willBeUpsideDown) {
                  toolboxContainer.classList.add("${styles.upsideDown}");
                } else {
                  toolboxContainer.classList.remove("${styles.upsideDown}");
                }
              }
            });
          };
          

          let options = {
            root: null, //use browser viewport
            threshold: 0.5 //0.25 of element must be onscreen for animation to take affect
          };

          let observer = new IntersectionObserver(callback, options);

          observer.observe(toolboxContainer);


          //set up transitionend listeners for toolboxImage and skillContainer

          toolboxImage.addEventListener("transitionend", (ev) => {
            if(!willBeUpsideDown) {
              transitionComplete = true;
              currentlyUpsideDown = willBeUpsideDown;
            } else {
              toolboxContainer.classList.add("${styles.upsideDown}");
            }
          });

          skillContainer.addEventListener("transitionend", (ev) => {
            if(willBeUpsideDown) {
              transitionComplete = true;
              currentlyUpsideDown = willBeUpsideDown;
            } else {
              toolboxContainer.classList.remove("${styles.upsideDown}");
            }
          });
          
          
          

        `
        }}
      />
    </div> 
    
  );
}

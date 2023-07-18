import Script from "next/script";
import styles from "./toolbox.module.scss";

export default function Toolbox() {
  /* Added upsideDown class so that if there is no Javascript, the list of skills is still visible*/
  return (
    <div id="toolboxContainer" className={`${styles.toolboxContainer}`}>
      <img className={styles.toolbox} src="/assets/images/svg/toolbox.svg"></img>
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
          
          //Use this callback when an intersection observer
          //finds an intersection between the toolbox container
          //and the browser's viewport.
          
          let callback = (entries, observer) => {
            entries.forEach((entry) => {
              if(entry.target == toolboxContainer) {
                willBeUpsideDown = entry.isIntersecting;

                //only start transition if a previous transition has already
                //finished.
                if(!transitionComplete) {
                  return;
                }

                //if the toolbox is already in the correct position, 
                //dont do anything
                if(currentlyUpsideDown == willBeUpsideDown) {
                  return;
                }

                transitionComplete = false;

                //start transition 
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
            threshold: 0.25 //0.25 of element must be onscreen for animation to take affect
          };

          let observer = new IntersectionObserver(callback, options);

          observer.observe(toolboxContainer);


          //set up transitionend listeners for toolboxImage and skillContainer

          
          toolboxImage.addEventListener("transitionend", (ev) => {
            //if the toolbox finished its transition and it is now
            //rightside up, the transition for the entire toolbox container
            //is done.
            if(!willBeUpsideDown) {
              transitionComplete = true;
              currentlyUpsideDown = willBeUpsideDown;
            } 
            //if this toolbox will be upside down, start the transition now.
            else {
              toolboxContainer.classList.add("${styles.upsideDown}");
            }
          });

          skillContainer.addEventListener("transitionend", (ev) => {
            //if the toolbox container is upside down, then 
            //the transition is complete.
            if(willBeUpsideDown) {
              transitionComplete = true;
              currentlyUpsideDown = willBeUpsideDown;
            } 
            //otherwise, start the transition to being rightside up.
            else {
              toolboxContainer.classList.remove("${styles.upsideDown}");
            }
          });
          
          
          

        `
        }}
      />
    </div> 
    
  );
}

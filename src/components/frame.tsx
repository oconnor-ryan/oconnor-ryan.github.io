import { CSSProperties } from "react";
import styles from "./frame.module.scss";

import modalStyles from "./modal-image.module.scss";
import ModalImage from "./modal-image";
import Script from "next/script";


export default function Frame({src, caption, href, newTab, useModal, css} : {
    src: string, //the relative URL to the image being displayed
    caption?: string | undefined,  //the caption that is displayed under the image
    href?: string | undefined,  //if defined, the Frame becomes an anchor element that will redirect to another page when clicked on
    useModal?: boolean //if true, upon clicking on the picture element, a ModalImage will be displayed
    newTab?: boolean | undefined, //if true, it opens the link in a new tab
    css?: CSSProperties | undefined //some css properties for the root element of this component
  }
) {

  //href property has priority over the useModal property, meaning that if 
  //href is defined and useModal is true, then the frame will become an
  //anchor element that will go to another page when clicked. Meanwhile, the 
  //frame cannot be clicked on to display a modal image.
  if(href && useModal) {
    useModal = false;
  }

  let frameImage = href ? 
    <a href={href} target={newTab ? "_blank" : ""} className={styles.pictureContainer}>
      <img className={styles.picture} src={src} alt={caption}></img>
    </a> 
    : //if useModal is true, turn the cursor into a pointer when this element is hovered over
    <div style={{cursor: useModal ? 'pointer' : undefined}} className={styles.pictureContainer}>
      <img className={styles.picture} src={src} alt={caption}></img>
    </div>;

  //This inserts a modal image inside the Frame component and 
  //injects a script that will add onClick event listeners to each Frame with a ModalImage component
  //that check for when the picture is clicked. When the picture is clicked, the ModalImage will
  //cover the entire screen and make it easier to view the image in the Frame component.
  let modal = useModal ? 
  <>
    <ModalImage imgSrc={src} caption={caption ? caption : ""}/>
    <Script id="open_modal" dangerouslySetInnerHTML={{
      __html: `

        /*
          Because this script is only injected once no matter how many Frame components there are,
          EVERY Frame component must be retrieved and given event listeners when appropriate
          (when a Frame has a ModalImage component)
        */
        const frames = document.getElementsByClassName("${styles.frame}");

        for(let frame of frames) {
          const modal = frame.getElementsByClassName("${modalStyles.modal}")[0];
          const closeButton = modal.getElementsByClassName("${modalStyles.close}")[0];

          //if a frame does not have a modal, ignore it.
          if(modal === undefined) {
            continue;
          }

          frame.addEventListener('click', (ev) => {
            ev.stopPropagation(); 

            if(!modal.classList.contains("${modalStyles.visible}")) {
              modal.classList.add("${modalStyles.visible}");
            }
          });
  
          closeButton.addEventListener('click', (ev) => {
            //prevents issue where when close button is clicked, the 
            //event gets propagated to any parent elements, including the frame.
            //This means that if you press the X button, the modal's 'visible' class is
            //removed, then the frame's event listener is called immediately after this,
            //inserting the 'visible' class back into the modal's classList

            ev.stopPropagation(); 

            if(modal.classList.contains("${modalStyles.visible}")) {
              modal.classList.remove("${modalStyles.visible}");
            }
            
          });

        }
        
      `
    }}/>
  </>
  : //if not using model, put nothing here
  <></>;


  return (
    <div style={css} className={styles.frame}>
      {frameImage}
      {caption ? <p className={styles.caption}>{caption}</p> : null}
      {modal}
    </div>
    
  )
}

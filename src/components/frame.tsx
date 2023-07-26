import { CSSProperties } from "react";
import styles from "./frame.module.scss";

import ModalImage from "./modal-image";


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

  //if href is undefined and useModal is false, use normal div as container for image
  let picContainer =
    <div className={styles.pictureContainer}>
      <img className={styles.picture} src={src} alt={caption}></img>
    </div>
  ;

  //use an anchor as a wrapper for the image
  if(href) {
    picContainer = 
      <a href={href} target={newTab ? "_blank" : ""} className={styles.pictureContainer}>
        <img className={styles.picture} src={src} alt={caption}></img>
      </a>
    ;
  } 
  
  //use a modal image component as a wrapper for the image
  else if(useModal) {
    picContainer = 
      <ModalImage 
        className={styles.pictureContainer} 
        imgSrc={src} 
        caption={caption ? caption : ""} 
        style={{cursor: 'pointer'}}
      >
        <img className={styles.picture} src={src} alt={caption}></img>
      </ModalImage>
    ;
  }

  return (
    <div style={css} className={styles.frame}>
      {picContainer}
      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
    
  )
}

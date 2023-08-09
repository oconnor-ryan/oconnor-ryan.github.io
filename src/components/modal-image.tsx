import Script from "next/script";
import styles from "./modal-image.module.scss";
import { CSSProperties, ReactNode } from "react";

/*
  The ModalImage component will display a popup of the image specified by the imgSrc parameter
  when the user clicks inside the ModalImage or its children. 
  
  The Modal Image is NOT THE MODAL BY ITSELF,
  it is a wrapper that contains both the popup that displays the image over the entire screen and 
  a list of children that it displays when the popup is not visible.
*/
export default function ModalImage ({imgSrc, caption, className, style, children} : {
  imgSrc: string, 
  caption: string, 
  className?: string, 
  style?: CSSProperties, 
  children: ReactNode 
}) {

  //allow style to be modified and allow classNames to be appended to the root div's className
  return <div style={style} className={`${styles.modal} ${className ? className : ""}`}>
    <div className={styles.popup}>
      <span className={styles.close}>&times;</span>
      <img className={styles.image} src={imgSrc}></img>
      {caption != "" ? <div className={styles.caption}>{caption}</div> : <></>}
    </div>
    
    <div className={styles.wrappedContent}>{children}</div>

    <Script id="modal_handler" dangerouslySetInnerHTML={{
      __html: `

        /*
          Because this script is only injected once no matter how many ModalImage components there are,
          EVERY ModalImage component must be retrieved and given event listeners.
        */
        const modals = document.getElementsByClassName("${styles.modal}");

        for(let modal of modals) {
          const closeButton = modal.getElementsByClassName("${styles.close}")[0];

          modal.addEventListener('click', (ev) => {
            ev.stopPropagation(); 

            if(!modal.classList.contains("${styles.visible}")) {
              modal.classList.add("${styles.visible}");
              document.body.classList.add("no-scroll"); //dont let the webpage scroll behind the modal 
            }
          });
  
          closeButton.addEventListener('click', (ev) => {
            //prevents issue where when close button is clicked, the 
            //event gets propagated to any parent elements, including the frame.
            //This means that if you press the X button, the modal's 'visible' class is
            //removed, then the frame's event listener is called immediately after this,
            //inserting the 'visible' class back into the modal's classList

            ev.stopPropagation(); 

            if(modal.classList.contains("${styles.visible}")) {
              modal.classList.remove("${styles.visible}");
              document.body.classList.remove("no-scroll"); //dont let the webpage scroll behind the modal 

            }
          });
        }
      `
    }}/>
  </div>
}
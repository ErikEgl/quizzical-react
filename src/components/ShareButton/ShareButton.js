import React from "react";
function ShareButton(props) {
  return (
    <>
        <li>
            <a className={`social-link icon-${props.alt}`} href={props.link} alt={props.alt} aria-label={props.alt}></a>
        </li>
    </>
  );
}

export default ShareButton;




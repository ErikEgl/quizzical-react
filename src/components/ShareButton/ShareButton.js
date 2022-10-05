import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
function ShareButton(props) {
  const {  } =
    useContext(UserContext);

  return (
    <>
        <li>
            <a className={`social-link icon-${props.alt}`} href={props.link} alt={props.alt}></a>
        </li>
    </>
  );
}

export default ShareButton;




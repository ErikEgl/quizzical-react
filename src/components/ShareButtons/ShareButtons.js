import React from "react";

import ShareButton from "../ShareButton/ShareButton";
import ShareButtonsData from "./ShareButtonsData";
import GithubStarButton from "../GithubStarButton/GithubStarButton";
function ShareButtons(props) {
console.log(props.endGame ? "position-bottom" : "position-top");
const buttons = ShareButtonsData.buttons.map(dataItem => {
    return <ShareButton  key={dataItem.siteName} alt={dataItem.siteName} link={dataItem.baseUrl}/>
})
  return (
    <>
        <ul className={`social-links ${
                    props.endGame ? "position-bottom" : "position-top"
                  }`}>
          {buttons}
          {/* {props.endGame ? "position-top" : "position-bottom"} */}
          <GithubStarButton />
        </ul>
    </>
  );
}

export default ShareButtons;




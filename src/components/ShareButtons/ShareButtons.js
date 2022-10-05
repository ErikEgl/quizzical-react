import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
import ShareButton from "../ShareButton/ShareButton";
import ShareButtonsData from "./ShareButtonsData";
function ShareButtons(props) {
//   const {  } =
//     useContext(UserContext);
const buttons = ShareButtonsData.buttons.map(dataItem => {
    return <ShareButton key={dataItem.siteName} alt={dataItem.siteName} link={dataItem.baseUrl}/>
})
  return (
    <>
        <ul className="social-links">
          {buttons}
        </ul>
    </>
  );
}

export default ShareButtons;




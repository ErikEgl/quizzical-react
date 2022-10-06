import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
function Hint(props) {
  const { hintHandleClick, gamePossessionsData, gameEnd } =
    useContext(UserContext);
  return (
    <>
      {
        <>
          <button
            disabled={props.isDisabled}
            onClick={() => hintHandleClick(props.questionId)}
            className={`${gameEnd ? "click-stop" : ''} hint hint-icon`}
          ></button>
          {gamePossessionsData.gems <= 10 && props.isDisabled && (
            <small className="hint-error"> Hint costs 10💎 </small>
          )}
        </>
      }
    </>
  );
}

export default Hint;

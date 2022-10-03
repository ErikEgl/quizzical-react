import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
function Hint(props) {
  const {
    hintHandleClick,
    gamePossessionsData,
    errorMessageHandleClick,
    showUserErrorMessage

  } = useContext(UserContext);
  return (
    <>
    {
      gamePossessionsData.gems >= 10 ?
      (<button disabled={props.isDisabled} onClick={() => hintHandleClick(props.questionId)} className="hint hint-icon">
      </button>)
      :
     ( <><button disabled={props.isDisabled} onClick={() => errorMessageHandleClick(props.questionId)} className="hint hint-icon">
      </button>
      {showUserErrorMessage && <small> Hint costs 10💎 </small>}</>
      )
    }

    </>
  );
}

export default Hint;

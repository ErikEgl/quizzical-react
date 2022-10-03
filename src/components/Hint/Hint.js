import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
function Hint(props) {
  const {
    hintHandleClick
  } = useContext(UserContext);
  return (
    <>
      <button disabled={props.isDisabled} onClick={() => hintHandleClick(props.questionId)} className="hint hint-icon">
      </button>
    </>
  );
}

export default Hint;

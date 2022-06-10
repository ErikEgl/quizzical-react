import React from "react";

function Button(props) {
  return (
    <>
      <button disabled={props.disabled} id={props.id} onClick={props.holdAnswer ? props.holdAnswer :  props.onClick}  className={props.className}>{props.content} {props.answer}</button>
    </>
  );
}

export default Button;

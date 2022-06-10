import React from "react";

function Button(props) {
  return (
    <>
      <button id={props.id} onClick={props.holdAnswer ? props.holdAnswer :  props.onClick}  className={props.className}>{props.content} {props.answer}</button>
    </>
  );
}

export default Button;

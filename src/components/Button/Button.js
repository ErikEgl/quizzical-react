import React from "react";

function Button(props) {
  return (
    <>
      <button onClick={props.holdAnswer ? props.holdAnswer :  props.onClick}  className={props.className}>{props.content} {props.answer}</button>
    </>
  );
}

export default Button;

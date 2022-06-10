import React from "react";
const parser = new DOMParser();

function Button(props) {
  return (
    <>
      <button disabled={props.disabled} id={props.id} onClick={props.holdAnswer ? props.holdAnswer :  props.onClick}  className={props.className}>
          {props.content} 
          {props.answer && parser.parseFromString(`<!doctype html><body> ${props.answer}`, 'text/html').body.textContent}
      </button>
    </>
  );
}

export default Button;

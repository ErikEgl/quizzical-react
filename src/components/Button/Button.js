import React from "react";

function Button(props) {
  return (
    <>
      <button {...props}>{props.content}</button>
    </>
  );
}

export default Button;

import React from "react";

function Button(props) {
  return (
    <>
      <button {...props}>{props.textContent}</button>
    </>
  );
}

export default Button;

import React from "react";
function QuizDataItemsWrap(props) {
  return (
    <>
    <div>
        <label htmlFor={props.classification}>Select {props.title}: </label>
        <select
          id={props.classification}
          name={props.classification}
          value={props.value}
          onChange={props.func}
          className="button-primary"
        >
          {props.children}
        </select>
      </div>
    </>
  );
}


export default QuizDataItemsWrap;




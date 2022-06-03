import React from "react";
import Button from "../Button/Button";

function Question({question, correct_answer, incorrect_answers}) {
  return (
    <>
      <div className="question">
        <h2>{question}</h2>
        <Button className='button-secondary' content={correct_answer} />
      </div>
    </>
  );
}

export default Question;


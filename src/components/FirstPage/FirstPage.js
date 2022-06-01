import Button from "../Button/Button";
// import Question from "../Question/Question";

import React from "react";

function FirstPage(props) {
  return (
    <>
      <section>
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <Button className='button-primary' textContent="Start quiz" />
      </section>
    </>
  );
}

export default FirstPage;

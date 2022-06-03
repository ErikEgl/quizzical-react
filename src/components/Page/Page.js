import Button from "../Button/Button";
import Question from "../Question/Question";

import React from "react";




function Page(props) {
  const [questions, setQuestions] = React.useState([])

  function startQuiz() {
    fetch('https://opentdb.com/api.php?amount=10')
    .then((response) =>  response.json())
    .then(data => setQuestions(data.results));
  }

  const questionItem = questions.map((question, index) => {
    return <Question key={index} question={question.question} correct_answer={question.correct_answer}/>;
    // return index
  }) 
  console.log(questionItem)
  return (
    <>
      {questions.length > 0 ? (
     <>{questionItem}</>
       ) : ( 
        <section>
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <Button onClick={startQuiz} className='button-primary' content="Start quiz" />
      </section>
         )
        }
    </>
  );
}

export default Page;

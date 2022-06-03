import Button from "../Button/Button";
import Question from "../Question/Question";

import React from "react";




function Page(props) {
  const [questions, setQuestions] = React.useState([])

  function startQuiz() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then((response) =>  response.json())
    .then(data => setQuestions(data.results));
  }

  const quizItem = questions.map((question, index) => {
    return (
      <div className="quiz-item">
        <Question key={index} question={question.question} />
        <div className="quiz-answers-wrap">
          <Button className='button-secondary' content={question.correct_answer} />
          <Button className='button-secondary' content={question.incorrect_answers[0]} />
          <Button className='button-secondary' content={question.incorrect_answers[1]} />
          <Button className='button-secondary' content={question.incorrect_answers[2]} />
        </div>
    </div>
    )
    // return index
  }) 
  console.log(questionItem)
  return (
    <>
      {quizItem.length > 0 ? (
     <>
      <section>
        {quizItem}
        <div className="check-info">

          <Button className='button-primary ' content="Check answers " />
        </div>
      </section>
     </>
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

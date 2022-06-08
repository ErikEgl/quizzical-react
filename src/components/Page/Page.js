import Button from "../Button/Button";
// import Question from "../Question/Question";
import React from "react";
import { nanoid } from "nanoid";

function Page(props) {
  const [fetchedQuestions, setFetchedQuestions] = React.useState([]);
  const [restructuredQuestionsArray, setRestructuredQuestionsArray] = React.useState([]);
  const [startGame, setStartGame] = React.useState(false);

  const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple"

  React.useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setFetchedQuestions(data.results));
  }, []);

  function startQuiz() {
    const newQuestionsArr = [];
    fetchedQuestions.map((question) => {
      newQuestionsArr.push({
        category: question.category,
        id: nanoid(),
        question: question.question,
        answers: [
          {
            id: nanoid(),
            answer: question.correct_answer,
            isCorrect: true,
            isHeld: true,
            key: nanoid(),
          },
          {
            id: nanoid(),
            answer: question.incorrect_answers[0],
            isCorrect: false,
            isHeld: false,
            key: nanoid(),
          },
          {
            id: nanoid(),
            answer: question.incorrect_answers[1],
            isCorrect: false,
            isHeld: false,
            key: nanoid(),
          },
          {
            id: nanoid(),
            answer: question.incorrect_answers[2],
            isCorrect: false,
            isHeld: false,
            key: nanoid(),
          },
        ],
      });
      setRestructuredQuestionsArray(newQuestionsArr);
      return newQuestionsArr
    });
    setStartGame((prevVal) => !prevVal);
    // arr.sort(() => Math.random() - 0.5)
  }

  function holdAnswer(questionId, answerId) {
    setRestructuredQuestionsArray((prevArray) => {
      return prevArray.map((prevArrayItems) => {
        return prevArrayItems.id === questionId ? 
        { ...prevArrayItems,
         answers: prevArrayItems.answers.map((answer) => {
           return answer.id === answerId ? 
           { ...answer, isHeld: !answer.isHeld } 
            : answer;
              }),
            }
          : prevArrayItems;
      });
    });
  }
  



  const quizItem = restructuredQuestionsArray.map((item, index) => {
    return (
      <div key={index} className="quiz-item">
            })}
        </div>}
      </div>
    );
  });
  // button-unchoosed
  // button-secondary
  return (
    <>
      {startGame ? (
        <section>
          <small>Category:</small>
          {restructuredQuestionsArray[0].category && <h1 style={{ margin: 0 }}>{restructuredQuestionsArray[0].category}</h1>}
          {quizItem}
          <div className="check-info">
            <Button className="button-primary" key={nanoid()} content="Check answers " />
          </div>
        </section>
      ) : (
        <section>
          <h1>Quizzical</h1>
          <p>Some description if needed</p>
          <button onClick={startQuiz} className="button-primary">
            Start quiz
          </button>
        </section>
      )}
    </>
  );
}

export default Page;

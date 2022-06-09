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
            isHeld: false,
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
      return newQuestionsArr;
    });
    setStartGame((prevVal) => !prevVal);
    // arr.sort(() => Math.random() - 0.5)
  }

  function holdAnswer(questionId, answerId) {
    //set all isHeld values to false
    setRestructuredQuestionsArray((prevArray) => {
      return prevArray.map((prevArrayItems) => {
        return prevArrayItems.id === questionId ? 
        { ...prevArrayItems,
         answers: prevArrayItems.answers.map((answer) => {
          return { ...answer, isHeld: false };
              }),
            }
          : prevArrayItems;
      });
    });
    //set clicked button`s isHeld value to true
    setRestructuredQuestionsArray((prevArray) => {
      return prevArray.map((prevArrayItems) => {
        return prevArrayItems.id === questionId ? 
        { ...prevArrayItems,
         answers: prevArrayItems.answers.map((answer) => {
           return  answer.id === answerId ? 
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
        {item.question && (
          <h2 dangerouslySetInnerHTML={{ __html: item.question }} />
        )}
        {item.answers && (
          <div className="quiz-answers-wrap">
            {/* .sort(() => Math.random() - 0.5) shuffles answers */}
            {item.answers.map((el) => {
              return (
                <Button
                onClick={() => holdAnswer(item.id, el.id)}
                  isHeld={el.isHeld}
                  className={
                    el.isHeld === false
                      ? "button-unselected"
                      : "button-selected"
                  }
                  id={
                    el.isCorrect === true
                      ? "correct"
                      : ""
                  }
                  key={el.id}
                  answer={el.answer}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  });
  return (
    <>
      {startGame ? (
        <section>
          <small>Category:</small>
          {restructuredQuestionsArray[0].category && (
            <h1 style={{ margin: 0 }}>
              {restructuredQuestionsArray[0].category}
            </h1>
          )}
          {quizItem}
          <div className="check-info">
            <Button

              className="button-primary"
              key={nanoid()}
              content="Check answers "
            />
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

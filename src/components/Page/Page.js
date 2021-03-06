import Button from "../Button/Button";
// import Question from "../Question/Question";
import React from "react";
import { nanoid } from "nanoid";


//TODO: hints
//TODO: choose more quiz options
//TODO: don`t let check answers before all is choosed

function Page(props) {
  // const [fetchedQuestions, setFetchedQuestions] = React.useState([
  //   {
  //     category: "Entertainment: Music",
  //     correct_answer: "Eddie Vedder",
  //     difficulty: "easy",
  //     incorrect_answers: ["Cuba", "Jamaica&lrm;", "Dominica"],
  //     question: "Who is the lead singer of Pearl Jam?",
  //     type: "multiple",
  //   },
  //   {
  //     category: "Entertainment: Music",
  //     correct_answer: "Eddie Vedder",
  //     difficulty: "easy",
  //     incorrect_answers: ["Ozzy Osbourne", "Stone Gossard", "Kurt Cobain"],
  //     question: "Who is the lead singer of Pearl Jam?",
  //     type: "multiple",
  //   },
  // ]);


  const [fetchedQuestions, setFetchedQuestions] = React.useState([])

  const [restructuredQuestionsArray, setRestructuredQuestionsArray] = React.useState([]);
  const [startGame, setStartGame] = React.useState(false);

  const [correctAnswersCounter, setCorrectAnswersCounter] = React.useState(0);
  const [gameEnd, setGameEnd] = React.useState(false);
  


  const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

  React.useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setFetchedQuestions(data.results));
  }, [gameEnd]);

  function startQuiz() {
    setGameEnd(false)
    setCorrectAnswersCounter(0)
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
      newQuestionsArr.map(quizItem => {
        return quizItem.answers.sort(() => Math.random() - 0.5)
      })
      setRestructuredQuestionsArray(newQuestionsArr);
      return newQuestionsArr;
    });
    setStartGame((prevVal) => !prevVal);
  }

  function holdAnswer(questionId, answerId) {
    //set all isHeld values to false, to eliminate a possibility to choose 2 answers simultaneously
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


function countCorrectAnswers() {
  restructuredQuestionsArray.map(quizItem => {
    return quizItem.answers.map(answer => {
      if(answer.isCorrect && answer.isHeld) {
        setCorrectAnswersCounter(prevCount => prevCount + +(answer.isCorrect && answer.isHeld))
      }
      return answer
    })
  })
  return setGameEnd(true)
}


  const quizItem = restructuredQuestionsArray.map((item, index) => {
    return (
      <div key={index} className="quiz-item">
        {item.question && (
          <h2 dangerouslySetInnerHTML={{ __html: item.question }} />
        )}
        {item.answers && (
          <div className="quiz-answers-wrap">
            {item.answers.map((el) => {
              return (
                <Button
                onClick={() => holdAnswer(item.id, el.id)}
                  isHeld={el.isHeld}
                  className= {`${!el.isHeld ? "button-unselected" : "button-selected"} ${ gameEnd && el.isHeld && el.isCorrect ? "button-success" : ""} ${ gameEnd && el.isHeld && !el.isCorrect? "button-error" : ""}`}  
                  disabled={gameEnd}
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
              {gameEnd && `You scored ${correctAnswersCounter}/${restructuredQuestionsArray.length} correct answers`}
            <Button
              onClick={gameEnd ? startQuiz : countCorrectAnswers}
              className="button-primary"
              key={nanoid()}
              content={gameEnd ? "Start quiz again" : "Check answers"}
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

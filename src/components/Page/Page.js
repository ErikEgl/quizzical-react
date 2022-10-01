import Button from "../Button/Button";
import QuizOptionsSelect from "../QuizOptionsSelect/QuizOptionsSelect";
import { nanoid } from "nanoid";
import React, {useContext} from "react";
import { UserContext } from "../../utils/useContext";

//TODO: hints
//TODO: handel fetch errors
//TODO: choose more quiz options
//TODO: don`t let check answers before all is choosed
//

function Page(props) {
  const { restructuredQuestionsArray, holdAnswer, gameEnd, startGame, correctAnswersCounter, startQuiz, countCorrectAnswers } = useContext(UserContext);

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
          {isFetchFailed ? (
            <>
              <h2>Oops, something went wrong</h2>
              <Button
                onClick={startQuiz}
                className="button-primary"
                key={nanoid()}
                content={"Start quiz again"}
              />
            </>
          ) : (
            <>
          <small>Category:</small>
              {restructuredQuestionsArray[0]?.category && (
            <h1 style={{ margin: 0 }}>
                  {restructuredQuestionsArray[0]?.category}
            </h1>
          )}
          {quizItem}
          <div className="check-info">
                {gameEnd &&
                  `You scored ${correctAnswersCounter}/${restructuredQuestionsArray.length} correct answers`}
            <Button
              onClick={gameEnd ? startQuiz : countCorrectAnswers}
              className="button-primary"
              key={nanoid()}
              content={gameEnd ? "Start quiz again" : "Check answers"}
            />
          </div>
            </>
          )}
        </section>
      ) : (
        <section>
          <h1>Quizzical</h1>
          <QuizOptionsSelect/>
          <button onClick={startQuiz} className="button-primary">
            Start quiz
          </button>
        </section>
      )}
    </>
  );
}

export default Page;

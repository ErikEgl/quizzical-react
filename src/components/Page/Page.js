import Button from "../Button/Button";
import QuizOptionsSelect from "../QuizOptionsSelect/QuizOptionsSelect";
import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
import Hint from "../Hint/Hint";
import ShareButtons from "../ShareButtons/ShareButtons";
import SignOut from "../SignOut/SignOut";
import { UserButton, useUser } from "@clerk/clerk-react";
//TODO: hints (like in who want to ba a millionare, only 3 hints)
//TODO: hints gives different amount of points depends on difficulty level
//TODO: add login to save points
//TODO: add category info to all questions if any
//TODO: don`t let check answers before all is choosed

function Page(props) {
  const {
    restructuredQuestionsArray,
    holdAnswer,
    gameEnd,
    startGame,
    correctAnswersCounter,
    startQuiz,
    countCorrectAnswers,
    isFetchFailed,
    formData,
    isFetchLoading,
    fetchedQuestions
  } = useContext(UserContext);
  const { user, isSignedIn } = useUser();
  const quizItem = restructuredQuestionsArray.map((item, index) => {
    return (
      <div key={index} className={`quiz-item level-${item.answers[0].difficulty}`}>
        <Hint isDisabled={item.showHint || item.showHintErrorMessage} questionId={item.id}/>
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
                  className={`${
                    !el.isHeld ? "button-unselected" : "button-selected"
                  } ${
                    gameEnd && el.isHeld && el.isCorrect ? "button-success" : ""
                  } ${
                    gameEnd && el.isHeld && !el.isCorrect ? "button-error" : ""
                  } ${
                    item.showHint && el.isCorrect && !item.showHintErrorMessage ? "showHint" : ""
                  }`}
                  disabled={gameEnd}
                  id={el.isCorrect === true ? "correct" : ""}
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
        <section style={{padding: "0 50px"}}>
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
                  {formData.triviaCategory === "any" ? "Mixed categories" : restructuredQuestionsArray[0]?.category}
                </h1>
              )}
              <small>Difficulty level: { formData.triviaDifficulty }</small>
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
                <div style={{textAlign: "center"}}>{gameEnd && <>Share your game result! <ShareButtons endGame={gameEnd}/></>}</div>
            </>
          )}
        </section>
      ) : (
        <section>
          <ShareButtons />
          
          <h1>Quizzical</h1>
          {isSignedIn && (
          <div className="user-block">
            {user ? <img  src={user.profileImageUrl} alt={user.fullName} /> : null} 
            <div>
              {user ? <p>Hello, {user.firstName}!</p> : null} 
              <SignOut/>
            </div>
          </div>
          )}
          <QuizOptionsSelect />
          <button onClick={startQuiz} className="button-primary start-btn" disabled={isFetchLoading || fetchedQuestions.response_code !== 0 }>
          {fetchedQuestions.response_code !== 0 ? `Something went wrong, choose something else` : 'Start quiz'} {isFetchLoading && <div className="spinner-dual-ring"></div>}
          </button>    
        </section>
      )}
    </>
  );
}

export default Page;

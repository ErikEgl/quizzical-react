import { useState, createContext, useEffect } from "react";
import { nanoid } from "nanoid";
const UserContext = createContext();

function AppContextProvider(props) {
  const [restructuredQuestionsArray, setRestructuredQuestionsArray] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [isFetchFailed, setIsFetchFailed] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  function startQuiz() {
    setGameEnd(false);
    setCorrectAnswersCounter(0);
  
    const newQuestionsArr = fetchedQuestions.map((question) => {
      const answers = [
        {
          id: nanoid(),
          answer: question.correct_answer,
          isCorrect: true,
          isHeld: false,
          key: nanoid(),
          difficulty: question.difficulty,
        },
        ...question.incorrect_answers.map((answer) => ({
          id: nanoid(),
          answer: answer,
          isCorrect: false,
          isHeld: false,
          key: nanoid(),
          difficulty: question.difficulty,
        })),
      ];
  
      return {
        category: question.category,
        id: nanoid(),
        question: question.question,
        showHint: false,
        showHintErrorMessage: false,
        answers: answers.sort(() => Math.random() - 0.5),
      };
    });
  
    setRestructuredQuestionsArray(newQuestionsArr);
    setStartGame((prevVal) => !prevVal);
  }

  function holdAnswer(questionId, answerId) {
    //set all isHeld values to false, to eliminate a possibility to choose 2 answers simultaneously
    setRestructuredQuestionsArray((prevArray) => {
      return prevArray.map((prevArrayItems) => {
        return prevArrayItems.id === questionId
          ? {
              ...prevArrayItems,
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
        return prevArrayItems.id === questionId
          ? {
              ...prevArrayItems,
              answers: prevArrayItems.answers.map((answer) => {
                return answer.id === answerId
                  ? { ...answer, isHeld: !answer.isHeld }
                  : answer;
              }),
            }
          : prevArrayItems;
      });
    });
  }

  function countCorrectAnswers() {
    restructuredQuestionsArray.map((quizItem) => {
      return quizItem.answers.map((answer) => {
        if (answer.isCorrect && answer.isHeld) {
          setCorrectAnswersCounter(prevCount => prevCount + +(+answer.isCorrect && +answer.isHeld));
          setGamePossessionsData(prevData => ({ gems: +prevData.gems + +(+answer.isCorrect && +answer.isHeld)}))
        }
        return answer;
      });
    });
    return setGameEnd(true)
  }
  const [formData, setFormData] = useState({
    triviaAmount: "5",
    triviaDifficulty: "any",
    triviaCategory: "any",
    triviaType: "any",
  });


  const [gamePossessionsData, setGamePossessionsData] = useState({
    gems: 50,
  });

  useEffect(() => {
    if(!!localStorage.getItem("gemsCounter")) setGamePossessionsData({gems: localStorage.getItem("gemsCounter")})
  }, [])
  useEffect(() => {
    localStorage.setItem("gemsCounter", gamePossessionsData.gems)
  }, [gamePossessionsData])

  function hintHandleClick (questionId) {
    const durationTime = 5000;
    if (gamePossessionsData.gems >= 10) {
      setGamePossessionsData(prevData => ({
        ...prevData,
        gems: prevData.gems - 10,
      }));
  
      toggleHint(questionId, true);
      setTimeout(() => toggleHint(questionId, false), durationTime);
    } else {
      toggleErrorMessage(questionId, true);
      setTimeout(() => toggleErrorMessage(questionId, false), durationTime);
    }
  }
  
  function toggleHint(questionId, show) {
    setRestructuredQuestionsArray((prevArray) =>
      prevArray.map((prevArrayItems) =>
        prevArrayItems.id === questionId
          ? {
              ...prevArrayItems,
              showHint: show,
            }
          : prevArrayItems
      )
    );
  }
  
  function toggleErrorMessage(questionId, show) {
    setRestructuredQuestionsArray((prevArray) =>
      prevArray.map((prevArrayItems) =>
        prevArrayItems.id === questionId
          ? {
              ...prevArrayItems,
              showHintErrorMessage: show,
            }
          : prevArrayItems
      )
    );
  }

  
  return (
    <UserContext.Provider
      value={{
        restructuredQuestionsArray,
        holdAnswer,
        gameEnd,
        startGame,
        correctAnswersCounter,
        startQuiz,
        countCorrectAnswers,
        setFetchedQuestions,
        formData,
        setFormData,
        isFetchFailed,
        setIsFetchFailed,
        isFetchLoading,
        setIsFetchLoading,
        hintHandleClick,
        setGamePossessionsData,
        gamePossessionsData
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { AppContextProvider, UserContext };
import { useState, createContext } from "react";
import { nanoid } from "nanoid";
const UserContext = createContext();

function AppContextProvider(props) {
  const [restructuredQuestionsArray, setRestructuredQuestionsArray] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [isFetchFailed, setIsFetchFailed] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  
  function startQuiz() {
    setGameEnd(false);
    setCorrectAnswersCounter(0);
    const newQuestionsArr = [];
    fetchedQuestions.map((question) => {
      newQuestionsArr.push({
        category: question.category,
        id: nanoid(),
        question: question.question,
        showHint: false,
        answers: [
          {
            id: nanoid(),
            answer: question.correct_answer,
            isCorrect: true,
            isHeld: false,
            key: nanoid(),
            difficulty: question.difficulty,
          },
          {
            id: nanoid(),
            answer: question.incorrect_answers[0],
            isCorrect: false,
            isHeld: false,
            key: nanoid(),
            difficulty: question.difficulty,
          },
          {
            id: nanoid(),
            answer: question.incorrect_answers[1],
            isCorrect: false,
            isHeld: false,
            key: nanoid(),
            difficulty: question.difficulty,
          },
          {
            id: nanoid(),
            answer: question.incorrect_answers[2],
            isCorrect: false,
            isHeld: false,
            key: nanoid(),
            difficulty: question.difficulty,
          },
        ],
      });
      newQuestionsArr.map((quizItem) => {
        return quizItem.answers.sort(() => Math.random() - 0.5);
      });
      setRestructuredQuestionsArray(newQuestionsArr);
      return newQuestionsArr;
    });
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
          setCorrectAnswersCounter(
            (prevCount) => prevCount + +(answer.isCorrect && answer.isHeld)
          );
        }
        return answer;
      });
    });
    return setGameEnd(true);
  }

  const [formData, setFormData] = useState({
    triviaAmount: "5",
    triviaDifficulty: "any",
    triviaCategory: "any",
  });

  function hintHandleClick (questionId) {
    setRestructuredQuestionsArray((prevArray) => {
      return prevArray.map((prevArrayItems) => {
        return prevArrayItems.id === questionId
          ? {
              ...prevArrayItems,
              showHint: !prevArrayItems.showHint,
            }
          : prevArrayItems;
      });
    });
    setTimeout(() => {
      setRestructuredQuestionsArray((prevArray) => {
        return prevArray.map((prevArrayItems) => {
          return prevArrayItems.id === questionId
            ? {
                ...prevArrayItems,
                showHint: !prevArrayItems.showHint,
              }
            : prevArrayItems;
        });
      });
    }, 3000)

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
        hintHandleClick
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { AppContextProvider, UserContext };
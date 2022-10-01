import { useContext, useEffect } from "react";
import { UserContext } from "../../utils/useContext";
import quizOptionsData from "./quizOptionsData";
import quizDifficultyData from "./quizDifficultyData";
function QuizOptionsSelect(props) {
  const { gameEnd, setFetchedQuestions, formData, setFormData, setIsFetchFailed } = useContext(UserContext);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const API_CATEGORY = formData.triviaCategory === "any" ? "" : `&category=${formData.triviaCategory}`
  const API_DIFFICULTY = formData.triviaDifficulty === "any" ? "" :  `&difficulty=${formData.triviaDifficulty}`;
  const API_URL = `https://opentdb.com/api.php?amount=${formData.triviaAmount}${API_CATEGORY}${API_DIFFICULTY}&type=multiple`;
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if(!response.ok) {
          return setIsFetchFailed(prevState => !prevState)
        }           
        return response.json()
      })
      .then((data) => setFetchedQuestions(data.results));
  }, [formData, gameEnd]);
  const quizOptionsDataItems = quizOptionsData.options.map((item) => {
    return (
      <option key={item.value} value={item.value}>
        {item.title}
      </option>
    );
  });
  const quizDifficultyDataItems = quizDifficultyData.options.map((item) => {
    return (
      <option key={item.level} value={item.level}>
        {item.levelTitle}
      </option>
    );
  });
  return (
    <>
      <h2><strong>Game Options</strong></h2>
      <form>
        <span>
          <label htmlFor="triviaAmount">Number of Questions:</label>
          <input
            type="number"
            name="triviaAmount"
            id="triviaAmount"
            min="1"
            max="50"
            defaultValue={formData.triviaAmount}
            onChange={handleChange}
          />
        </span>
        <div>
          <label htmlFor="triviaCategory">Select Category: </label>
          <select
            id="triviaCategory"
            name="triviaCategory"
            value={formData.triviaCategory}
            onChange={handleChange}
            className="button-primary"
          >
            {quizOptionsDataItems}
          </select>
        </div>
        <div>
          <label htmlFor="triviaDifficulty">Select Difficulty: </label>
          <select
            id="triviaDifficulty"
            name="triviaDifficulty"
            value={formData.triviaDifficulty}
            onChange={handleChange}
          >
            {quizDifficultyDataItems}
          </select>
        </div>
      </form>
    </>
  );
}

export default QuizOptionsSelect;

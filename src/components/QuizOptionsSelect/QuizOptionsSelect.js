import { useContext, useEffect } from "react";
import { UserContext } from "../../utils/useContext";
import quizOptionsData from "./quizOptionsData/quizOptionsData";
import quizDifficultyData from "./quizOptionsData/quizDifficultyData";
import quizTypeData from "./quizOptionsData/quizTypeData";
function QuizOptionsSelect(props) {
  const { gameEnd, setFetchedQuestions, formData, setFormData,  setIsFetchLoading } = useContext(UserContext);

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
  const API_TYPE = formData.triviaType === "any" ? "" :  `&type=${formData.triviaType}`;
  const API_URL = `https://opentdb.com/api.php?amount=${formData.triviaAmount}${API_CATEGORY}${API_DIFFICULTY}${API_TYPE}`;
  useEffect(() => {
    setIsFetchLoading(true)
    fetch(API_URL)
    .then(response => response.json())
    .then((data) => {
      return (
        setIsFetchLoading(false),
        setFetchedQuestions(data)
      )
    }
    );
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
  const quizTypeDataItems = quizTypeData.options.map((item) => {
    return (
      <option key={item.type} value={item.type}>
        {item.typeTitle}
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
        <div>
          <label htmlFor="triviaType">Select Type: </label>
          <select 
            id="triviaType"
            name="triviaType" 
            value={formData.triviaType}
            onChange={handleChange}>
              {quizTypeDataItems}
          </select>
        </div>
      </form>
    </>
  );
}

export default QuizOptionsSelect;

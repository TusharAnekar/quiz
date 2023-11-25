import { useReducer } from "react";
import "./App.css";
import { initialQuiz, quizReducer } from "./reducers/quiz-reducer";

function App() {
  const [quiz, setQuiz] = useReducer(quizReducer, initialQuiz);

  const handleAnswer = (e) => {
    setQuiz({ type: "SET_USER_ANSWER", payload: e.target.value });
  };

  const handleSubmit = () => {
    if (
      quiz.quizQuestions[quiz.currentQuestion].correctAnswer === quiz.userAnswer
    ) {
      setQuiz({ type: "UPDATE_SCORE" });
      setQuiz({ type: "SET_FEEDBACK", payload: "Correct" });
    } else {
      setQuiz({ type: "SET_FEEDBACK", payload: "Incorrect" });
    }

    if (quiz.currentQuestion + 1 < quiz.quizQuestions.length) {
      setQuiz({ type: "UPDATE_CURRENT_QUESTION" });
    } else {
      setQuiz({ type: "TOGGLE_IS_SHOW_FINAL_SCORE" });
    }
  };

  const handleReset = () => {
    setQuiz({ type: "RESET_QUIZ" });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">Quiz</h1>
      <p className="mb-4 w-3/4 max-w-md text-lg md:text-xl">
        {quiz.currentQuestion +
          1 +
          "/" +
          quiz.quizQuestions.length +
          ". " +
          quiz.quizQuestions[quiz.currentQuestion].questionText}
      </p>

      <div className="flex w-3/4 max-w-md flex-col gap-2">
        {quiz.quizQuestions[quiz.currentQuestion].answerOptions.map(
          (option, index) => (
            <label key={index} className="rounded bg-slate-400 p-2">
              <input
                type="radio"
                value={option}
                name={quiz.currentQuestion}
                checked={quiz.userAnswer === option}
                required
                onClick={handleAnswer}
                className="mr-2 cursor-pointer "
              ></input>
              {option}
            </label>
          ),
        )}
      </div>

      {quiz.isShowFinalScore ? (
        <button
          className="mt-4 rounded border bg-red-500 px-4 py-2 text-white"
          onClick={handleReset}
        >
          Reset
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="mt-4 rounded border bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </button>
      )}

      <div className="mt-4 text-lg font-semibold">
        {quiz.isShowFinalScore ? (
          <p className="text-green-600">
            The final score is {quiz.score} / {quiz.quizQuestions.length}
          </p>
        ) : (
          <p
            className={
              quiz.feedback === "Correct" ? "text-green-600" : "text-red-600"
            }
          >
            {quiz.feedback}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { questions } from "./db/questions";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setIsFeedback] = useState("");
  const [isShowFinalScore, setIsFinalScore] = useState(false);

  const handleAnswer = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (questions[currentQuestion].correctAnswer === userAnswer) {
      setScore((prev) => prev + 1);
      setIsFeedback("Correct");
    } else {
      setIsFeedback("Incorrect");
    }

    if (currentQuestion + 1 < questions.length)
      setCurrentQuestion((prev) => prev + 1);
    else setIsFinalScore(true);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setScore(0);
    setIsFeedback("");
    setIsFinalScore(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">Quiz</h1>
      <p className="mb-4 w-3/4 max-w-md text-lg md:text-xl">
        {currentQuestion +
          1 +
          "/" +
          questions.length +
          ". " +
          questions[currentQuestion].questionText}
      </p>

      <div className="flex w-3/4 max-w-md flex-col gap-2">
        {questions[currentQuestion].answerOptions.map((option, index) => (
          <label key={index} className="rounded bg-slate-400 p-2">
            <input
              type="radio"
              value={option}
              name={currentQuestion}
              required
              onClick={handleAnswer}
              className="mr-2 cursor-pointer "
            ></input>
            {option}
          </label>
        ))}
      </div>

      {isShowFinalScore ? (
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
        {isShowFinalScore ? (
          <p className="text-green-600">
            The final score is {score} / {questions.length}
          </p>
        ) : (
          <p
            className={
              feedback === "Correct" ? "text-green-600" : "text-red-600"
            }
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

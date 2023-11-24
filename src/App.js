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

  return (
    <div>
      <p>{questions[currentQuestion].questionText}</p>

      <div>
        {questions[currentQuestion].answerOptions.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option}
              name={currentQuestion}
              required
              onClick={handleAnswer}
            ></input>
            {option}
          </label>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>

      <div>
        {isShowFinalScore ? (
          <p>
            The final score is {score} / {questions.length}
          </p>
        ) : (
          <p>{feedback}</p>
        )}
      </div>
    </div>
  );
}

export default App;

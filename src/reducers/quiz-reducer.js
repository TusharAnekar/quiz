import { questions } from "../db/questions";

const initialQuiz = {
  quizQuestions: questions,
  currentQuestion: 0,
  userAnswer: "",
  score: 0,
  feedback: "",
  isShowFinalScore: false,
};

const quizReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_CURRENT_QUESTION":
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case "SET_USER_ANSWER":
      return { ...state, userAnswer: payload };
    case "UPDATE_SCORE":
      return { ...state, score: state.score + 1 };
    case "SET_FEEDBACK":
      return { ...state, feedback: payload };
    case "TOGGLE_IS_SHOW_FINAL_SCORE":
      return { ...state, isShowFinalScore: !state.isShowFinalScore };
    case "RESET_QUIZ":
      return (state = initialQuiz);
    default:
      return state;
  }
};

export { initialQuiz, quizReducer };

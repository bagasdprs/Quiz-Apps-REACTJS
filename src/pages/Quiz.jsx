import React, { useContext, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const { loading, questions, currentIndex, selectAnswer, nextQuestion, finishQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!questions || questions.length === 0)) {
      navigate("/setup");
    }
  }, [loading, questions, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600">Loading questions...</div>;
  }

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const options = [...currentQ.incorrect_answers, currentQ.correct_answer].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    selectAnswer(answer);
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) nextQuestion();
      else {
        finishQuiz();
        navigate("/result");
      }
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-indigo-100 to-indigo-200">
      <div className="flex justify-between w-full max-w-2xl px-6 mb-4">
        <Timer key="quiz-timer" initialTime={60} onTimeout={() => navigate("/result")} />
        <p className="font-semibold text-gray-700">
          Question {currentIndex + 1} / {questions.length}
        </p>
      </div>

      <QuestionCard question={currentQ.question} options={options} currentIndex={currentIndex} total={questions.length} onAnswer={handleAnswer} />
    </div>
  );
}

export default Quiz;

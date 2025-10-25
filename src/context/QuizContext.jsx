import React, { createContext, useState, useEffect } from "react";
import { getQuizQuestions } from "../services/quizApi";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quizProgress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setQuestions(parsed.questions);
      setCurrentIndex(parsed.currentIndex);
      setScore(parsed.score);
      setAnswers(parsed.answers);
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("quizProgress", JSON.stringify({ questions, currentIndex, score, answers }));
    }
  }, [questions, currentIndex, score, answers]);

  // const setupQuiz = async (amount, type) => {
  //   const data = await getQuizQuestions(amount, type);
  //   setQuestions(data);
  //   setCurrentIndex(0);
  //   setScore(0);
  //   setAnswers([]);
  // };

  const setupQuiz = async (amount, type) => {
    setLoading(true);
    try {
      const data = await getQuizQuestions(amount, type);
      setQuestions(data);
      setCurrentIndex(0);
      setScore(0);
      setAnswers([]);
    } catch (err) {
      console.error("Failed to load quiz questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (answer) => {
    const currentQ = questions[currentIndex];
    const isCorrect = answer === currentQ.correct_answer;
    setAnswers([...answers, { question: currentQ.question, answer, isCorrect }]);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => setCurrentIndex((prev) => prev + 1);

  const finishQuiz = () => {
    localStorage.removeItem("quizProgress");
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    localStorage.removeItem("quizProgress");
  };

  return (
    <QuizContext.Provider
      value={{
        loading,
        questions,
        currentIndex,
        score,
        setupQuiz,
        selectAnswer,
        nextQuestion,
        finishQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

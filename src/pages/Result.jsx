import React, { useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Confetti from "react-confetti";
import ReactCanvasConfetti from "react-canvas-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Result() {
  const { score, questions, resetQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const percentage = Math.round((score / questions.length) * 100);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const explosionRef = useRef(null);

  const handleRestart = () => {
    resetQuiz();
    navigate("/setup");
  };

  // useEffect(() => {
  //   if (percentage < 50) {
  //     setShowExplosion(true);
  //     const delay = setTimeout(() => triggerExplosion(), 300);
  //     const stop = setTimeout(() => setShowExplosion(false), 4000);
  //     return () => {
  //       clearTimeout(delay);
  //       clearTimeout(stop);
  //     };
  //   } else {
  //     setShowConfetti(true);
  //     const stop = setTimeout(() => setShowConfetti(false), 8000);
  //     return () => clearTimeout(stop);
  //   }
  // }, [percentage]);

  useEffect(() => {
    if (percentage < 50) {
      // tampilkan canvas dulu
      setShowExplosion(true);
    } else {
      // nilai bagus → confetti
      setShowConfetti(true);
      const stop = setTimeout(() => setShowConfetti(false), 8000);
      return () => clearTimeout(stop);
    }
  }, [percentage]);

  // Efek terpisah, hanya jalan setelah canvas muncul dan ref tersedia
  useEffect(() => {
    if (showExplosion && explosionRef.current) {
      // kasih sedikit jeda agar rendering benar-benar selesai
      const delay = setTimeout(() => {
        explosionRef.current({
          particleCount: 200,
          spread: 250,
          startVelocity: 60,
          decay: 0.9,
          origin: { x: 0.5, y: 0.7 },
          colors: ["#ff4b5c", "#ff8b5f", "#ffc85c", "#ffffff", "#ff0055"],
        });
      }, 200);

      const stop = setTimeout(() => setShowExplosion(false), 4000);
      return () => {
        clearTimeout(delay);
        clearTimeout(stop);
      };
    }
  }, [showExplosion]);

  const triggerExplosion = () => {
    if (!explosionRef.current) return;
    explosionRef.current({
      particleCount: 180,
      spread: 200,
      startVelocity: 60,
      origin: { x: 0.5, y: 0.7 },
      colors: ["#ff4b5c", "#ff8b5f", "#ffc85c", "#ffffff"],
    });
  };

  const colorClass = percentage < 50 ? "text-red-500" : "text-green-600";
  const colorValue = percentage < 50 ? "#ff4b5c" : "#00b894";

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} width={window.innerWidth} height={window.innerHeight} />}
      {showExplosion && (
        <ReactCanvasConfetti
          refConfetti={(instance) => (explosionRef.current = instance)}
          style={{
            position: "fixed",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 50,
          }}
        />
      )}

      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-green-100 to-blue-100 text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz is Finished!</h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-4">
            {/* Progress Bar */}
            <div className="w-40 h-40 mb-4">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathColor: colorValue,
                  textColor: colorValue,
                  trailColor: "#eee",
                  textSize: "20px",
                  pathTransitionDuration: 1,
                })}
              />
            </div>
            <p className="text-lg font-semibold mb-2 text-gray-700">
              You answered <span className="text-blue-600">{score}</span> out of
              <span className="text-blue-600"> {totalQuestions}</span> correctly.
            </p>
            <p className={`text-xl font-bold ${colorClass} mb-6`}>Score: {percentage}%</p>
            <Button variant="primary" onClick={handleRestart}>
              Play Again
            </Button>
          </div>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <p className="text-lg font-semibold mb-2 text-gray-700">
            You answered <span className="text-blue-600">{score}</span> out of <span className="text-blue-600">{totalQuestions}</span> correctly.
          </p>

          <p className="text-xl font-bold text-green-600 mb-6">Score: {percentage}%</p>

          <Button variant="primary" onClick={handleRestart}>
            Play Again
          </Button>
        </div> */}
      </div>
      {/* <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-green-100 to-green-200">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center w-80">
          <h2 className="text-2xl font-bold mb-4">
            <p className="text-gray-600 mb-6">
              You Scored <span className="font-bold text-green-600">{score}</span> out of {questions.length} questions.
            </p>

            <p className="text-xl font-semibold mb-6">
              Accuracy: <span className="text-blue-600">{percentage}%</span>
            </p>

            <Button
              variant="primary"
              onClick={() => {
                resetQuiz();
                navigate("/setup");
              }}
            >
              Try Again
            </Button>
          </h2>
        </div>
      </div> */}
    </>
  );
}

export default Result;

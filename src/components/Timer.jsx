import React, { useEffect } from "react";
import useTimer from "../hooks/useTimer";
// import { formatTime } from "../utils/formatTime";

function Timer({ initialTime = 60, onTimeout }) {
  const { timeLeft, startTimer } = useTimer(initialTime, onTimeout);

  // useEffect(() => {
  //   startTimer();
  // }, [startTimer]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTimer();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    // <div className="text-center font-mono text-lg font-bold text-blue-700">⏳ {formatTime(timeLeft)}</div>
    <div className="text-center font-mono text-lg font-bold text-blue-700">
      ⏳ {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;

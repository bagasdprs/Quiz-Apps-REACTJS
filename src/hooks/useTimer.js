import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (initialTime = 60, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      // console.log("tick");
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          if (onTimeout) onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onTimeout]);

  // const startTimer = () => {
  //   if (intervalRef.current) return;

  //   intervalRef.current = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(intervalRef.current);
  //         intervalRef.current = null;
  //         if (onTimeout) onTimeout();
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // };

  // const resetTimer = (restart = false) => {
  //   clearInterval(intervalRef.current);
  //   intervalRef.current = null;
  //   setTimeLeft(initialTime);
  //   if (restart) startTimer();
  // };

  const resetTimer = useCallback(
    (restart = false) => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeLeft(initialTime);
      if (restart) startTimer();
    },
    [initialTime, startTimer]
  );

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // useEffect(() => {
  //   setTimeLeft(initialTime);
  // }, [initialTime]);

  return { timeLeft, startTimer, resetTimer };
};

export default useTimer;

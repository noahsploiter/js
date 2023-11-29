// Timer.js
import React, { useState, useEffect } from "react";

const Timer = ({ onTimerComplete }) => {
  const [seconds, setSeconds] = useState(20);
  const [gameNumber, setGameNumber] = useState(1); // Initialize game number to 1

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        onTimerComplete(); // Trigger the onTimerComplete function when the timer reaches 0
        setSeconds(20); // Reset the timer to 20 seconds
        setGameNumber((prevGameNumber) => prevGameNumber + 1); // Increment the game number
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onTimerComplete]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-900">
        0:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <h1 className="text-xl text-red-900 font-bold">
        Game Number: {gameNumber}
      </h1>{" "}
      {/* Display the game number */}
    </div>
  );
};

export default Timer;

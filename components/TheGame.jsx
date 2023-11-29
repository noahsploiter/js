import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Winners from "./Winners";
import Timer from "./Timer";

const TheGame = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(200);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);

  useEffect(() => {
    fetch("https://simba-api.onrender.com/game")
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
        console.log(fetchedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderNumbers = (start, end) => {
    return data
      .filter((item) => item >= start && item <= end)
      .map((item, index) => (
        <div
          className="ml-2"
          key={index}
          style={{
            transition: "background-color 0.3s, color 0.3s", // Add transition for background-color and color
            border: "2px solid #980eb3",
            fontSize: "1.2rem",
            animation: "fadeIn 0.5s ease forwards", // Add a fadeIn animation
            borderRadius: "50%",
            backgroundColor: selectedNumbers.includes(item)
              ? "#980eb3"
              : "#980eb3",
            color: selectedNumbers.includes(item) ? "white" : "yellow",
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleNumberSelection(item)}
        >
          {item}
        </div>
      ));
  };
  const handleNumberSelection = (selectedNumber) => {
    if (selectedNumbers.includes(selectedNumber)) {
      // If the selected number is already in the selectedNumbers array, remove it
      const updatedNumbers = selectedNumbers.filter(
        (num) => num !== selectedNumber
      );
      setSelectedNumbers(updatedNumbers);
    } else if (selectedNumbers.length < 1) {
      // If the selected number is not in the selectedNumbers array and the limit of 3 numbers hasn't been reached, add it
      setSelectedNumbers([...selectedNumbers, selectedNumber]);
    }
  };

  const handleBet = () => {
    const min = 1; // Minimum number
    const max = 30; // Maximum number
    const randomNumbers = [];
    while (randomNumbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    setRandomNumbers(randomNumbers);
    setSelectedNumbers([]);
  };

  const handleTimerComplete = () => {
    handleBet(); // Call the handleBet function to generate random numbers when the timer reaches 0
  };

  return (
    <div className="md:flex justify-between mr-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <Winners randomNumbers={randomNumbers} />
        </div>

        <div className="md:ml-[-120px]">
          <div className="w-full">
            <h1 className="text-center text-2xl md:text-5xl text-[#00384c] font-bold">
              BET 200
            </h1>

            <h1 className="text-center text-xl text-[#00384c] font-bold pb-5">
              MAX PAYOUT 6000 ETB
            </h1>
          </div>
          <div className="grid-container flex flex-col justify-center items-center space-y-3 ">
            <div className="grid-item ">
              <div className="grid-numbers flex md:gap-3 ">
                {renderNumbers(1, 7)}
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-numbers flex md:gap-3 ">
                {renderNumbers(8, 14)}
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-numbers flex md:gap-3 ">
                {renderNumbers(15, 21)}
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-numbers flex md:gap-3 ">
                {renderNumbers(22, 28)}
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-numbers flex md:gap-3 ">
                {renderNumbers(29, 30)}
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-center mt-3 text-3xl text-[#00384c] font-bold">
              PICKED NUMBERS
            </h1>
            <div>
              <div className="flex gap-5 mt-3 mb-3">
                {selectedNumbers.map((num, index) => (
                  <span
                    style={{
                      border: "2px solid #980eb3",
                      backgroundColor: "#980eb3",
                      color: "white",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      animation: "fadeIn 1s ease forwards",
                    }}
                    className="gap-5"
                    key={index}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <input
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
                className="w-[80px] text-green-950 text-xl rounded-md pl-2 bg-gray-600"
                type="number"
              />
              <button
                onClick={handleBet}
                className=" bg-green-950 w-[80px] rounded-md text-white font-bold"
              >
                BET
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Timer onTimerComplete={handleTimerComplete} />{" "}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TheGame;

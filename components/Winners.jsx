import React from "react";
import { motion } from "framer-motion";

const Winners = ({ randomNumbers }) => {
  return (
    <div>
      <div className="bg-yellow-300 text-center rounded-md md:w-[200px] ml-10 mt-2">
        <h1 className="md:text-3xl md:font-bold text-green-900 text-xl font-bold">
          WINNING NUMBERS
        </h1>
      </div>
      <div className="flex mt-2 justify-center ml-10 gap-2 md:flex-col">
        {randomNumbers.map((number, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              fontSize: "1.2rem",
              border: "2px solid #980eb3",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#980eb3",
              color: "yellow",
            }}
          >
            <span>{number}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Winners;

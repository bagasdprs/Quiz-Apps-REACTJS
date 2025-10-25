import React, { useContext, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";

function SetupQuiz() {
  const { setupQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const [amount, setAmount] = useState(5);
  const [type, setType] = useState("multiple");

  const handleStart = async (e) => {
    e.preventDefault();
    await setupQuiz(amount, type);
    navigate("/quiz");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-xl p-8 w-80">
          <h2 className="text-xl font-bold mb-6 text-center">Setup Your Quiz ⚙</h2>
          <form onSubmit={handleStart}>
            <label className="block mb-2 font-semibold">Number of Quiestions</label>
            <input type="number" min="1" max="30" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-2 font-semibold">Question Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded-md p-2 mb-4">
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
            <div className="flex justify-center">
              <Button type="submit" variant="primary" className="w-full">
                Start
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SetupQuiz;

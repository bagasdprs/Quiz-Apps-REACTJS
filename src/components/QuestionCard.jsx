import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

function QuestionCard({ question, options, currentIndex, total, onAnswer }) {
  return (
    <>
      <motion.div key={question} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full">
        <h2 className="text-lg font-semibold mb-4">
          Question {currentIndex + 1} / {total}
        </h2>
        <p className="text-gray-800 mb-6" dangerouslySetInnerHTML={{ __html: question }} />
        <div className="grid gap-3">
          {options.map((opt, idx) => (
            <Button key={idx} variant="secondary" onClick={() => onAnswer(opt)} className="text-left">
              <span dangerouslySetInnerHTML={{ __html: opt }}></span>
            </Button>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default React.memo(QuestionCard);

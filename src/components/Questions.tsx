import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import data from "../../data.json";
import { ScoreContext } from "@/App";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  label: string;
  values: string[];
};

type Question = {
  path: string;
  options: Option[];
};

const Questions = () => {
  const [count, setCount] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>(
    []
  );
  const navigate = useNavigate();
  const { scores, setScores } = useContext(ScoreContext);

  useEffect(() => {
    // Randomly select 7 questions and shuffle them
    const allQuestions = [...data.questions];
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 7);
    setRandomizedQuestions(selected);
  }, []); // Empty dependency array means this runs once on mount

  // Guard against randomizedQuestions not being set yet
  if (randomizedQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = randomizedQuestions[count];

  const handleNext = (selectedValues: string[]) => {
    // Update scores for each personality trait
    const newScores = { ...scores };
    selectedValues.forEach((value) => {
      newScores[value] = (newScores[value] || 0) + 1;
    });
    setScores(newScores);

    // Navigate or go to next question
    if (count + 1 >= randomizedQuestions.length) {
      navigate("/result");
    } else {
      setCount((count) => count + 1);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8">
      <div className="flex flex-col gap-6 h-full w-full md:max-w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 text-[#2174E2]">Question {count + 1}</h2>
          <p className="text-lg text-gray-600">
            Select an option that fits most what you see
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={count}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button 
                  onClick={() => handleNext(option.values)}
                  className="w-full p-6 bg-white border border-gray-100 shadow-sm rounded-lg hover:bg-[#2174E2] hover:text-white transition-all text-lg font-medium text-left"
                >
                  {option.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#2174E2]"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((count + 1) / randomizedQuestions.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-lg font-medium text-[#2174E2]">Question {count + 1}</span>
            <span className="text-lg text-gray-600">Total {randomizedQuestions.length}</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          className="w-full md:max-w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={`/${currentQuestion.path}`}
            alt="Personality test image"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Questions;

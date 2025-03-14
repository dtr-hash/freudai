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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <>
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
            className="w-full md:max-w-1/2 relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#2174E2] opacity-0 group-hover:opacity-10 transition-opacity duration-300 cursor-pointer"
              initial={false}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsModalOpen(true)}
            />
            <motion.img
              src={`/${currentQuestion.path}`}
              alt="Personality test image"
              className="w-full shadow-lg transition-transform duration-300 cursor-pointer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              layoutId={`image-${count}`}
              onClick={() => setIsModalOpen(true)}
            />
            <motion.div
              className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[#2174E2] font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {count + 1} of {randomizedQuestions.length}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src={`/${currentQuestion.path}`}
                alt="Personality test image"
                className="w-full h-full object-contain"
                layoutId={`image-${count}`}
              />
              <motion.div
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[#2174E2] font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Click anywhere to close
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Questions;

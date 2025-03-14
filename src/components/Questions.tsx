import { useState, useContext, useEffect, useCallback } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();
  const { scores, setScores } = useContext(ScoreContext);

  const currentQuestion = randomizedQuestions[count];

  // Handle keyboard events
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isModalOpen) {
      setIsModalOpen(false);
    }
    // Add number key navigation for options (1-4)
    const num = parseInt(e.key);
    if (num >= 1 && currentQuestion?.options && num <= currentQuestion.options.length) {
      handleNext(currentQuestion.options[num - 1].values);
    }
  }, [isModalOpen, currentQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const allQuestions = [...data.questions];
        const shuffled = allQuestions.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 7);
        setRandomizedQuestions(selected);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-[#2174E2] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg text-gray-600">Loading your personality test...</p>
        </motion.div>
      </div>
    );
  }

  if (randomizedQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">We couldn't load the questions. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="bg-[#2174E2] text-white hover:bg-[#1b5fc5]">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const handleNext = (selectedValues: string[]) => {
    // Update scores for each personality trait
    const newScores = { ...scores };
    selectedValues.forEach((value) => {
      newScores[value] = (newScores[value] || 0) + 1;
    });
    setScores(newScores);

    // Close modal if open when moving to next question
    if (isModalOpen) {
      setIsModalOpen(false);
    }

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
            <p className="text-lg text-gray-600 flex items-center gap-2">
              Select an option that fits most what you see
              <span className="text-sm bg-[#2174E2]/10 text-[#2174E2] px-2 py-1 rounded-md font-medium">
                Use keys 1-{currentQuestion.options.length}
              </span>
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
                    className="w-full p-6 bg-white border border-gray-100 shadow-sm hover:bg-[#2174E2] hover:text-white transition-all text-lg font-medium text-left group relative"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center border-2 border-[#2174E2] text-[#2174E2] rounded-full text-sm font-bold group-hover:bg-white group-hover:text-[#2174E2] transition-colors">
                      {index + 1}
                    </span>
                    <span className="pl-10">{option.label}</span>
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
            role="progressbar"
            aria-valuenow={((count + 1) / randomizedQuestions.length) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
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
              className="absolute inset-0 bg-[#2174E2] opacity-0 group-hover:opacity-10 transition-opacity duration-300 cursor-zoom-in"
              initial={false}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsModalOpen(true)}
            />
            <motion.img
              src={`/${currentQuestion.path}`}
              alt={`Question ${count + 1} image - Click to enlarge`}
              className="w-full shadow-lg transition-transform duration-300 cursor-zoom-in"
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
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Image Preview"
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
                alt={`Question ${count + 1} image - Full size view`}
                className="w-full h-full object-contain"
                layoutId={`image-${count}`}
              />
              <motion.div
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[#2174E2] font-medium flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="flex items-center gap-2">
                  Press <span className="bg-[#2174E2]/10 px-2 py-0.5 rounded-md font-bold">ESC</span> or click to close
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Questions;

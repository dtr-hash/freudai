import { useContext } from "react";
import { Link } from "react-router";
import { ScoreContext } from "@/App";
import { motion } from "framer-motion";

const Result = () => {
  const { scores, setScores } = useContext(ScoreContext);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleReset = () => {
    setScores({});
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-[#2174E2]">Your Personality Analysis</h2>
        <p className="text-lg text-gray-600 mb-8">
          Based on your choices, we have analyzed your personality traits
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          className="w-full md:max-w-1/2 grid gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Object.entries(scores).map(([trait, score]) => (
            <motion.div 
              key={trait} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              variants={item}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="capitalize text-xl font-medium text-[#2174E2]">{trait}</span>
                <span className="text-2xl font-bold text-[#2174E2]">{score}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#2174E2]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / 7) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
              <div className="flex gap-2 mt-4">
                {[...Array(score)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-6 h-6 rounded-full bg-[#2174E2] bg-[url('/freud.png')] bg-cover bg-center"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="w-full md:max-w-[400px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <img src="/success.png" alt="" className="w-full rounded-lg shadow-lg" />
        </motion.div>
      </div>

      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/questions" onClick={handleReset}>
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-4 border-2 border-[#2174E2] text-[#2174E2] hover:bg-[#2174E2] hover:text-white transition-all rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" 
                clipRule="evenodd" 
              />
            </svg>
            Take the test again
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Result;

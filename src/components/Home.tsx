import { Link } from "react-router";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-[#2174E2]">FreudAI Personality Test</h2>
        <p className="text-lg text-gray-600">
          Discover your personality traits through image interpretation
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          className="w-full md:max-w-1/2 flex flex-col gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white p-6 border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-600 leading-relaxed">
              You will be shown a series of carefully selected images. For each image, choose the interpretation that resonates most with what you see. Your choices will help us analyze your personality traits using FreudAI's advanced algorithms.
            </p>
          </div>

          <Link to="/questions" className="w-fit">
            <motion.div 
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#2174E2] text-[#2174E2] hover:bg-[#2174E2] hover:text-white transition-all font-medium"
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
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Start the test
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          className="w-full md:max-w-[400px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white p-6 border border-gray-100 shadow-sm">
            <img src="/qr-code.png" alt="QR Code" className="w-full mb-4" />
            <a 
              href="https://freud.reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#2174E2] hover:underline font-medium block text-center"
            >
              freud.reviews
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 
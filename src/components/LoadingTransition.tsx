import { motion } from "framer-motion";

const LoadingTransition = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <motion.div
          className="relative w-48 h-48"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <img 
            src="/freud.png" 
            alt="Sigmund Freud" 
            className="w-full h-full object-cover rounded-full border-4 border-[#2174E2]"
          />
          <motion.div
            className="absolute inset-0 border-4 border-[#2174E2] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-[#2174E2] mb-2">Analyzing Your Responses</h2>
          <p className="text-gray-600">Freud is interpreting your personality traits...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingTransition; 
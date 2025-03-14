import "./App.css";
import {createContext, useState} from "react";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router";
import Home from "@/components/Home";
import Questions from "@/components/Questions";
import Result from "@/components/Result";
import { AnimatePresence, motion } from "framer-motion";

type ScoreContextType = {
  scores: Record<string, number>;
  setScores: (scores: Record<string, number>) => void;
};

export const ScoreContext = createContext<ScoreContextType>({
  scores: {},
  setScores: () => {},
});

// Create a separate header component to use navigation
const Header = ({ setScores }: { setScores: (scores: Record<string, number>) => void }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    setScores({});
    navigate('/');
  };

  return (
    <h1 
      className="text-[36px] font-bold mb-6 cursor-pointer" 
      onClick={handleTitleClick}
    >
      FreudAI
    </h1>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const location = useLocation();

  return (
    <div className="min-h-full flex flex-col">
      <ScoreContext.Provider value={{ scores, setScores }}>
        <Header setScores={setScores} />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            } />
            <Route path="questions" element={
              <PageWrapper>
                <Questions />
              </PageWrapper>
            } />
            <Route path="result" element={
              <PageWrapper>
                <Result />
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </ScoreContext.Provider>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;

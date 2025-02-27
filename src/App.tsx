import "./App.css";
import {createContext, useState} from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Home from "@/components/Home";
import Questions from "@/components/Questions";
import Result from "@/components/Result";

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
      className="text-[36px] font-bold md:mb-8 cursor-pointer" 
      onClick={handleTitleClick}
    >
      FreudAI
    </h1>
  );
};

function App() {
  const [scores, setScores] = useState<Record<string, number>>({});

  return (
    <div className="flex flex-col gap-8">
      <BrowserRouter>
        <ScoreContext.Provider value={{ scores, setScores }}>
          <Header setScores={setScores} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="questions" element={<Questions />} />
            <Route path="result" element={<Result />} />
          </Routes>
        </ScoreContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

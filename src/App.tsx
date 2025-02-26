import "./App.css";
import {createContext, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router";
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

function App() {
  const [scores, setScores] = useState<Record<string, number>>({});

  return (
    <div className="flex flex-col h-[100vh] gap-8">
      <h1 className="text-[36px] font-bold mb-8">FreudAI</h1>
      <BrowserRouter>
        <ScoreContext.Provider value={{ scores, setScores }}>
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

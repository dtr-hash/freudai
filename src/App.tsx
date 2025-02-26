import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/components/Home";
import Questions from "@/components/Questions";
import Result from "@/components/Result";

function App() {
  return (
    <div className="flex flex-col h-[100vh] gap-8  ">
      <h1 className="text-[36px] font-bold mb-8">FreudAI</h1>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="questions" element={<Questions />} />
            <Route path="result" element={<Result />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

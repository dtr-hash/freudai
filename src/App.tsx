import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/components/Home";
import Questions from "@/components/Questions";
import Result from "@/components/Result";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="questions" element={<Questions />} />
          <Route path="result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

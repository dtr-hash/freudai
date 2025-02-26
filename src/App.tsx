import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/components/Home";
import Questions from "@/components/Questions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="questions" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import data from "../../data.json";

type Option = {
  label: string;
  values: string[];
};

type Question = {
  path: string;
  options: Option[];
};

type Data = {
  questions: Question[];
  optionsLabels: string[];
};

const Questions = () => {
  const [count, setCount] = useState(0);
  const questions: Data = data;
  const currentQuestion = questions.questions[count];
  const navigate = useNavigate();

  const handleNext = () => {
    if (count + 1 >= questions.questions.length) {
      navigate("/result");
    } else {
      setCount(count => count + 1);
    }
  };

  return (
    <>
      <div>Questions page {count}</div>
      <img 
        src={`/${currentQuestion.path}`}  
        alt="Personality test image"
        className="w-full max-w-xl rounded-lg shadow-lg my-4"
      />
      <br />
      <div className="flex gap-4 items-center justify-center">
        <Button onClick={handleNext}>
          {currentQuestion.options[0].label}
        </Button>
        <Button onClick={handleNext}>
          {currentQuestion.options[1].label}
        </Button>
        <Button onClick={handleNext}>
          {currentQuestion.options[2].label}
        </Button>
      </div>
    </>
  );
};

export default Questions; 
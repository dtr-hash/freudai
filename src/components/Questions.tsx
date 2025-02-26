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
      setCount((count) => count + 1);
    }
  };

  return (
    <div className="flex gap-12">
      <div className="flex flex-col gap-4 h-full w-1/2">
        <p className="mb-4 text-lg">Select an option that fits most what you see  ({count + 1 } / 9)</p>
        <Button onClick={handleNext}>{currentQuestion.options[0].label}</Button>
        <Button onClick={handleNext}>{currentQuestion.options[1].label}</Button>
        <Button onClick={handleNext}>{currentQuestion.options[2].label}</Button>
      </div>
      <img
        src={`/${currentQuestion.path}`}
        alt="Personality test image"
        className="w-w-1/2"
      />
    </div>
  );
};

export default Questions;

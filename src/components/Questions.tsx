import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  return (
    <>
      <div>Questions page {count}</div>
      <img 
        src={`/${currentQuestion.path}`}  
        alt="Personality test image"
        className="w-full max-w-xl rounded-lg shadow-lg my-4"
      />
      <br />
      <Button onClick={() => setCount((count) => count + 1)}>
        Next question
      </Button>
    </>
  );
};

export default Questions; 
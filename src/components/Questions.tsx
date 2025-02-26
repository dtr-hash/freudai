import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import data from "../../data.json";
import { ScoreContext } from "@/App";

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
  const { scores, setScores } = useContext(ScoreContext);

  const handleNext = (selectedValues: string[]) => {
    // Update scores for each personality trait
    const newScores = { ...scores };
    selectedValues.forEach(value => {
      newScores[value] = (newScores[value] || 0) + 1;
    });
    setScores(newScores);

    // Navigate or go to next question
    if (count + 1 >= questions.questions.length) {
      navigate("/result");
    } else {
      setCount((count) => count + 1);
    }
  };

  return (
    <div className="flex gap-12">
      <div className="flex flex-col gap-4 h-full w-1/2">
        <p className="mb-4 text-lg">Select an option that fits most what you see ({count + 1} / 9)</p>
        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button key={index} onClick={() => handleNext(option.values)}>
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <img
        src={`/${currentQuestion.path}`}
        alt="Personality test image"
        className="w-1/2 rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Questions;

import { useContext } from "react";
import { Link } from "react-router";
import { ScoreContext } from "@/App";

const Result = () => {
  const { scores, setScores } = useContext(ScoreContext);
  
  console.log('Personality scores:', scores);

  const handleReset = () => {
    setScores({});
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-6xl font-bold text-amber-500">FreudAI</h1>
      <p className="text-lg">
        Here are your personality test results
        <br />
        Based on your choices, we have analyzed your personality traits
      </p>
      
      <div className="grid gap-4">
        {Object.entries(scores).map(([trait, score]) => (
          <div key={trait} className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
            <span className="capitalize">{trait}</span>
            <span className="font-bold">{score}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link to="/questions" onClick={handleReset}>
          Take the test again
        </Link>
      </div>
    </div>
  );
};

export default Result;

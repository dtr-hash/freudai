import { useContext } from "react";
import { Link } from "react-router";
import { ScoreContext } from "@/App";

const Result = () => {
  const { scores, setScores } = useContext(ScoreContext);
  
  console.log("Personality scores:", scores);

  const handleReset = () => {
    setScores({});
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg">Here are your personality test results</p>
      <p className="text-lg">
        Based on your choices, we have analyzed your personality traits
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <div className=" w-full md:max-w-1/2 grid gap-2 md:gap-4">
          {Object.entries(scores).map(([trait, score]) => (
            <div key={trait} className="flex items-center py-0 md:py-2">
              <span className="capitalize w-[180px]">{trait}</span>
              <span className="font-bold">{score}</span>
              <div className="flex gap-0_5 ml-4">
                {[...Array(score)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-black bg-[url('/freud.png')] bg-cover bg-center"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <img src="/success.png" alt="" className="w-full md:max-w-[400px] mx-auto" />
      </div>
      <div className="mt-4">
        <Link to="/questions" onClick={handleReset}>
          <div className="p-4 w-[200px] border border-gray-800 text-center">
            Take the test again
          </div>
        </Link>
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Result;

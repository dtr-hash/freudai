import { useSearchParams, Link } from "react-router";

const Result = () => {
  console.log("Result");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-6xl font-bold text-amber-500">FreudAI</h1>
      <p className="text-lg">
        Here are your personality test results
        <br />
        Based on your choices, we have analyzed your personality traits
      </p>
      <div className="mt-4">
        <Link to="/questions">Take the test again</Link>
      </div>
    </div>
  );
};

export default Result; 
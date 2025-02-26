import { useSearchParams, Link } from "react-router";

const Result = () => {
  console.log("Result");

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg">Your test results are as follows</p>


      <div className="mt-4">
        <Link to="/questions">Take the test again</Link>
      </div>
    </div>
  );
};

export default Result;

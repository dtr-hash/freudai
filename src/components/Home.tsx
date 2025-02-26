import { useSearchParams, Link } from "react-router";

const Home = () => {
  console.log("Home");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-6xl font-bold text-amber-500">FreudAI</h1>
      <p className="text-lg">
        Thank you for taking the FreudAI personality test
<br />
        You will be shown a series of images, please select the option you find the one matching the most with what you see in there
      </p>
      <div className="mt-4">
        <Link to="/questions">Start the test</Link>
      </div>
    </div>
  );
};

export default Home; 
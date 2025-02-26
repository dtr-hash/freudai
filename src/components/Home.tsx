import { Link } from "react-router";

const Home = () => {
  console.log("Home");

  return (
    <div className="flex flex-col gap-6 w-full md:max-w-1/2">
      <p className="text-lg">
        Thank you for taking the FreudAI personality test
      </p>
      <p className="text-lg">
        You will be shown a series of images, please select the option you find the one matching the most with what you see in there
      </p>
      <Link to="/questions">
        <div className="p-4 w-full md:w-[200px] border border-gray-800 text-center">
          Start the test
        </div>
      </Link>
    </div>
  );
};

export default Home; 
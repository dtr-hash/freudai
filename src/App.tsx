import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BrowserRouter,
  useSearchParams,
  Link,
  Route,
  Routes,
} from "react-router";
const About = () => {
  console.log("In about...");
  const [count, setCount] = useState(0);

  return (
    <>
      <div>About page...</div>
      <Link to="/?hello=world&molly=YA">Go to home!</Link>
      <p></p>
      <Button onClick={() => setCount((count) => count + 1)}>
        Click me count is {count}
      </Button>
    </>
  );
};
const Home = () => {
  const [searchParams] = useSearchParams();

  console.log("Home");

  return (
    <>
      {searchParams.toString() !== "" ? (
        <div>Home page with query {searchParams.toString()}...</div>
      ) : (
        <></>
      )}

      <div className="bg-amber-500 mb-5 p-4 rounded-lg">
        <h2 className="text-white text-4xl">Welcome to Freud.AI</h2>
      </div>
      <Badge variant="secondary">
        The very most awesomesest candidate personallyt test!
      </Badge>
      <div className="mt-4">
        <Link to="/about">Go to about</Link>
      </div>
    </>
  );
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

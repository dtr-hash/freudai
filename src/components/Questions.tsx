import { useState } from "react";
import { Button } from "@/components/ui/button";

const Questions = () => {
  console.log("In about...");
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Questions page {count}</div>

      <br />
      <Button onClick={() => setCount((count) => count + 1)}>
        Next question
      </Button>
    </>
  );
};

export default Questions; 
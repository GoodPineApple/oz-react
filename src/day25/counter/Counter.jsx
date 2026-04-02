import { useState } from "react";

const Counter = () => {
  // const count = 0; // hook과 연동되지 않음
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1); // 0 + 1
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default Counter;

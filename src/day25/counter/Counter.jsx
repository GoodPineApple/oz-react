import { useState, useEffect } from "react";

const Counter = () => {
  // const count = 0; // hook과 연동되지 않음
  const [count, setCount] = useState(0);
  //   const handleIncrement = () => {
  //     setCount(count + 1); // 0 + 1
  //   };

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const handleIncrement = () => setCount(count + 1);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default Counter;

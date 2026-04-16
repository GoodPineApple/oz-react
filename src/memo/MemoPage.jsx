import { useEffect, useState, useCallback, memo } from "react";

const MemoPage = () => {
  return (
    <div>
      <h1>MemoPage</h1>
      <ParentComponent />
    </div>
  );
};

function ParentComponent() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log("ParentComponent count changed");
  }, []);

  const handleClick = useCallback(() => {
    console.log("ParentComponent clicked");
  }, []);

  console.log("ParentComponent rendered");
  return (
    <div>
      <h1>ParentComponent</h1>
      <button onClick={handleIncrement}>Increment: {count}</button>
      <ChildComponent text={`static text`} onClick={handleClick} />
    </div>
  );
}

/**
 * 원칙적으로는 ChildComponent는 ParentComponent가 리렌더링할 때에
 * 같이 리렌더링 된다.
 * 이를 방지하기 위해 memo() 함수를 사용해서 ChildComponent를 메모이제이션 할 수 있다.
 * 그런데 이 프로젝트는 ReactCompiler가 활성화되어 있어서,
 * React Compiler가 컴포넌트를 분석해서 자동으로 메모이제이션을 넣어준다.
 *  */
const ChildComponent = memo(({ text, onClick }) => {
  console.log("ChildComponent rendered");
  return (
    <div>
      <h1>ChildComponent</h1>
      <p>{text}</p>
      <button onClick={onClick}>Click</button>
    </div>
  );
});

export default MemoPage;

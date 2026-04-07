import Card from "../common/card/Card";
import StyledBox from "../common/box/StyledBox";

const Greeting = () => {
  const name = "Taem";
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold">Hello, {name}</h1>
    </div>
  );
};

const Button = () => {
  return <button>Click me</button>;
};

const MainPage = () => {
  return (
    <>
      <Greeting />
      <Button />
      <Card />
      <StyledBox />
    </>
  );
};

export default MainPage;

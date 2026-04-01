import Card from "../common/Card";
import StyledBox from "../common/box/StyledBox";

const Greeting = () => {
  const name = "Taem";
  return (
    <div>
      <h1>Hello, {name}</h1>
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

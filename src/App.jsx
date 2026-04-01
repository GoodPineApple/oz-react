import "./App.css";
import Header from "./layout/Header";

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

function App() {
  return (
    <>
      <Header />
      <Greeting />
      <Button />
    </>
  );
}

export default App;

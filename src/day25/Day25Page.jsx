import { useState } from "react";
import Counter from "./counter/Counter";
import UserForm from "./user-form/UserForm";
import DataFetch from "./data-fetch/DataFetch";
import InputControl from "../common/input/InputControl";
import Card from "../common/card/Card";

const Day25Page = () => {
  const [text, setText] = useState("");

  return (
    <>
      <h1>Day 25</h1>
      <Counter />
      <UserForm />
      <DataFetch />
      <InputControl value={text} onValueChange={setText} />
      <Card>
        <h2>Card Title</h2>
        <p>Text: {text}</p>
      </Card>
    </>
  );
};

export default Day25Page;

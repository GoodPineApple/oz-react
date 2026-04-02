import { useState } from "react";
import Counter from "./counter/Counter";
import UserForm from "./user-form/UserForm";
import DataFetch from "./data-fetch/DataFetch";
import InputControl from "../common/input/InputControl";

const Day25Page = () => {
  const [text, setText] = useState("");

  return (
    <>
      <h1>Day 25</h1>
      <Counter />
      <UserForm />
      <DataFetch />
      <InputControl value={text} onValueChange={setText} />
      <p>Text: {text}</p>
    </>
  );
};

export default Day25Page;

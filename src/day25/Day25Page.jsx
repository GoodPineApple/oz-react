import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Counter from "./counter/Counter";
import UserForm from "./user-form/UserForm";
import DataFetch from "./data-fetch/DataFetch";
import InputControl from "../common/input/InputControl";
import Card from "../common/card/Card";
import { MyThemeContext } from "../context/MyThemeContext";

const Day25Page = () => {
  const [text, setText] = useState("");
  const { theme } = useContext(MyThemeContext);

  return (
    <Stack spacing={3} sx={{ maxWidth: 720, mx: "auto" }}>
      <Typography variant="h4" component="h1">
        Day 25 ({theme})
      </Typography>
      <Counter />
      <Divider />
      <UserForm />
      <Divider />
      <DataFetch />
      <Divider />
      <InputControl value={text} onValueChange={setText} />
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Card Title
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Text: {text}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Day25Page;

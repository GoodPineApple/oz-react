import { useContext } from "react";
import { Typography, Button, Stack } from "@mui/material";
import Card from "../common/card/Card";
import StyledBox from "../common/box/StyledBox";
import { MyThemeContext } from "../context/MyThemeContext";
import { AlertContext } from "../context/AlertContext";

const Greeting = () => {
  const { theme } = useContext(MyThemeContext);
  const name = "Taem";
  return (
    <Stack alignItems="center" sx={{ py: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Hello, {name} ({theme})
      </Typography>
    </Stack>
  );
};

const MainPage = () => {
  const showAlert = useContext(AlertContext);
  const handleClick = () => {
    showAlert("Hello, World!", "success");
  };
  return (
    <Stack spacing={3} alignItems="center" sx={{ width: "100%" }}>
      <Greeting />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Click me
      </Button>
      <Card sx={{ width: "100%", maxWidth: 480 }} />
      <StyledBox />
    </Stack>
  );
};

export default MainPage;

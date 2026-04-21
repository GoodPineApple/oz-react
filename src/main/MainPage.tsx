import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Stack } from "@mui/material";
import Card from "../common/card/Card";
import StyledBox from "../common/box/StyledBox";
import { MyThemeContext } from "../context/MyThemeContext";
import { AlertContext } from "../context/AlertContext";

const Greeting = () => {
  const ctx = useContext(MyThemeContext);
  const theme = ctx?.theme ?? "light";
  const name = "Taem";
  return (
    <Stack sx={{ alignItems: "center", py: 2 }}>
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
    <Stack spacing={3} sx={{ alignItems: "center", width: "100%" }}>
      <Greeting />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Click me
      </Button>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          component={RouterLink}
          to="/counter-redux"
          variant="outlined"
          color="primary"
        >
          Redux Toolkit 카운터
        </Button>
        <Button
          component={RouterLink}
          to="/counter-zustand"
          variant="outlined"
          color="secondary"
        >
          Zustand 카운터
        </Button>
      </Stack>
      <Button
        component={RouterLink}
        to="/memo"
        variant="outlined"
        color="primary"
      >
        Memoization 페이지
      </Button>
      <Card sx={{ width: "100%", maxWidth: 480 }} />
      <StyledBox />
    </Stack>
  );
};

export default MainPage;

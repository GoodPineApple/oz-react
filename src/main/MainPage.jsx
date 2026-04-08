import { Typography, Button, Stack } from "@mui/material";
import Card from "../common/card/Card";
import StyledBox from "../common/box/StyledBox";

const Greeting = () => {
  const name = "Taem";
  return (
    <Stack alignItems="center" sx={{ py: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Hello, {name}
      </Typography>
    </Stack>
  );
};

const MainPage = () => {
  return (
    <Stack spacing={3} alignItems="center" sx={{ width: "100%" }}>
      <Greeting />
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert("Button clicked")}
      >
        Click me
      </Button>
      <Card sx={{ width: "100%", maxWidth: 480 }} />
      <StyledBox />
    </Stack>
  );
};

export default MainPage;

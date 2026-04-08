import { Typography, Button } from "@mui/material";
import Card from "../common/card/Card";
import StyledBox from "../common/box/StyledBox";

const Greeting = () => {
  const name = "Taem";
  return (
    <div className="text-center p-4">
      <Typography variant="h3" component="h1">
        Hello, {name}
      </Typography>
    </div>
  );
};

const MainPage = () => {
  return (
    <>
      <Greeting />
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert("Button clicked")}
      >
        Click me
      </Button>
      <Card />
      <StyledBox />
    </>
  );
};

export default MainPage;

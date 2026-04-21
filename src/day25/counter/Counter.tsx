import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const handleIncrement = () => setCount(count + 1);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
      >
        <Typography variant="body1">Count: {count}</Typography>
        <Button variant="contained" onClick={handleIncrement}>
          Increment
        </Button>
      </Box>
    </Paper>
  );
};

export default Counter;

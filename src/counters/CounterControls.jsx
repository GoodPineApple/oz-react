import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const CounterControls = ({
  title,
  value,
  max,
  onIncrement,
  onDecrement,
  onReset,
}) => {
  return (
    <Paper variant="outlined" sx={{ p: 3, width: "100%", maxWidth: 420 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5" component="h1">
          {title}
        </Typography>
        <Typography variant="h3" component="p" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          범위: 0 ~ {max}
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
          <Button variant="contained" color="primary" onClick={onIncrement}>
            +1
          </Button>
          <Button variant="contained" color="secondary" onClick={onDecrement}>
            −1
          </Button>
          <Button variant="outlined" onClick={onReset}>
            초기화 (0)
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CounterControls;

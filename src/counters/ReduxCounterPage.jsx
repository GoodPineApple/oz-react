import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, COUNTER_MAX } from "../store/counterSlice";
import CounterControls from "./CounterControls";

const ReduxCounterPage = () => {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Stack spacing={3} alignItems="center" sx={{ width: "100%" }}>
      <CounterControls
        title="Redux Toolkit 카운터"
        value={value}
        max={COUNTER_MAX}
        onIncrement={() => dispatch(increment())}
        onDecrement={() => dispatch(decrement())}
        onReset={() => dispatch(reset())}
      />
      <Button component={RouterLink} to="/" variant="text">
        메인으로
      </Button>
    </Stack>
  );
};

export default ReduxCounterPage;

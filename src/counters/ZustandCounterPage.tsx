import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useCounterStore, COUNTER_MAX } from "../store/counterZustandStore";
import CounterControls from "./CounterControls";

const ZustandCounterPage = () => {
  const value = useCounterStore((s) => s.value);
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);
  const reset = useCounterStore((s) => s.reset);

  return (
    <Stack spacing={3} sx={{ alignItems: "center", width: "100%" }}>
      <CounterControls
        title="Zustand 카운터"
        value={value}
        max={COUNTER_MAX}
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
      />
      <Button component={RouterLink} to="/" variant="text">
        메인으로
      </Button>
    </Stack>
  );
};

export default ZustandCounterPage;

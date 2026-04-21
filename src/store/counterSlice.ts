import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const MAX = 99;

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      if (state.value < MAX) {
        state.value += 1;
      }
    },
    decrement: (state: CounterState) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    reset: (state: CounterState) => {
      state.value = 0;
    },
    setValue: (state: CounterState, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, reset, setValue } = counterSlice.actions;
export const COUNTER_MAX = MAX;
export default counterSlice.reducer;

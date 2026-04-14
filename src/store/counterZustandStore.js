import { create } from "zustand";

export const COUNTER_MAX = 99;

export const useCounterStore = create((set, get) => ({
  value: 0,
  increment: () =>
    set((state) => ({
      value: state.value < COUNTER_MAX ? state.value + 1 : state.value,
    })),
  decrement: () =>
    set((state) => ({
      value: state.value > 0 ? state.value - 1 : state.value,
    })),
  reset: () => {
    console.log("reset");
    console.log("get() : ", get());
    console.log("get().value : ", get().value);
    const value = get().value;
    if (value === 5) alert("5");
    set({ value: 0 });
  },
}));

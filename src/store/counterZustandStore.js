import { create } from "zustand";

export const COUNTER_MAX = 99;

export const useCounterStore = create((set) => ({
  value: 0,
  increment: () =>
    set((state) => ({
      value: state.value < COUNTER_MAX ? state.value + 1 : state.value,
    })),
  decrement: () =>
    set((state) => ({
      value: state.value > 0 ? state.value - 1 : state.value,
    })),
  reset: () => set({ value: 0 }),
}));

import { create, type StateCreator } from "zustand";

type CounterState = {
  counter: number;
};

type CounterActions = {
  increment: () => void;
  decrement: () => void;
  changeByAmount: (amount: number) => void;
};

type CounterStore = CounterState & CounterActions;

const counterSlice: StateCreator<CounterStore> = (set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
  changeByAmount: (amount) =>
    set((state) => ({ counter: state.counter + amount })),
});

export const useCounterStore = create<CounterStore>(counterSlice);

export const changeByAmount = (amount: number) =>
  useCounterStore.getState().changeByAmount(amount);
export const getCounter = () => useCounterStore.getState().counter;

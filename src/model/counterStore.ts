import { type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { create } from "../helpers/create";

type CounterState = {
  counter: number;
  persistedCounter: number;
};

type CounterActions = {
  increment: () => void;
  decrement: () => void;
  changeByAmount: (amount: number) => void;
  resetStore: VoidFunction;
};

type CounterStore = CounterState & CounterActions;

const initialState: CounterState = {
  counter: 0,
  persistedCounter: 0,
};

const counterSlice: StateCreator<
  CounterStore,
  [["zustand/persist", unknown]]
> = (set) => ({
  counter: 0,
  persistedCounter: 0,
  resetStore: () => {
    set(initialState);
  },
  increment: () =>
    set((state) => ({
      counter: state.counter + 1,
      persistedCounter: state.persistedCounter + 1,
    })),
  decrement: () =>
    set((state) => ({
      counter: state.counter - 1,
      persistedCounter: state.persistedCounter - 1,
    })),
  changeByAmount: (amount) =>
    set((state) => ({
      counter: state.counter + amount,
      persistedCounter: state.persistedCounter + amount,
    })),
});

export const useCounterStore = create<CounterStore>()(
  persist(counterSlice, {
    name: "counterStore",
    partialize: ({ persistedCounter }) => ({ persistedCounter }),
  })
);

export const changeByAmount = (amount: number) =>
  useCounterStore.getState().changeByAmount(amount);
export const getCounter = () => useCounterStore.getState().counter;

import { create, type StateCreator } from "zustand";
import type { CoffeeType } from "../types/coffeeTypes";
import { devtools } from "zustand/middleware";

const BASE_URL = "https://purpleschool.ru/coffee-api";

type CoffeeState = {
  coffeeList?: CoffeeType[];
};

type CoffeeActions = {
  getCoffeeList: VoidFunction;
};

type CoffeeStore = CoffeeState & CoffeeActions;

const coffeeSlice: StateCreator<CoffeeStore, [["zustand/devtools", never]]> = (
  set
) => ({
  coffeeList: undefined,
  getCoffeeList: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch coffee list");
      }
      const data = await response.json();
      set(
        {
          coffeeList: data,
        },
        false,
        "getCoffeeList"
      );
    } catch (error) {
      console.error("Error fetching coffee list:", error);
    }
  },
});

export const useCoffeeStore = create<CoffeeStore>()(
  devtools(coffeeSlice, { name: "CoffeeStore" })
);

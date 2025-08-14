import { create, type StateCreator } from "zustand";
import type {
  CoffeeType,
  GetCoffeeListRequestParams,
} from "../types/coffeeTypes";
import { devtools } from "zustand/middleware";

const BASE_URL = "https://purpleschool.ru/coffee-api";

type CoffeeState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
};

type CoffeeActions = {
  getCoffeeList: (params?: GetCoffeeListRequestParams) => Promise<void>;
};

type CoffeeStore = CoffeeState & CoffeeActions;

const coffeeSlice: StateCreator<CoffeeStore, [["zustand/devtools", never]]> = (
  set,
  get
) => ({
  coffeeList: undefined,
  controller: undefined,
  getCoffeeList: async (params) => {
    try {
      const { controller } = get();
      if (controller) {
        controller.abort();
      }
      const newController = new AbortController();
      const { signal } = newController;
      set({ controller: newController });

      const searchParams = new URLSearchParams();
      if (params && params.text) {
        searchParams.append("text", params.text);
      }

      const response = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
        signal,
      });
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

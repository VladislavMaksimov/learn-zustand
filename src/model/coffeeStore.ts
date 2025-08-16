import { create, type StateCreator } from "zustand";
import type {
  CoffeeType,
  GetCoffeeListRequestParams,
} from "../types/coffeeTypes";
import { devtools } from "zustand/middleware";

type CoffeeState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  params: GetCoffeeListRequestParams;
};

type CoffeeActions = {
  getCoffeeList: (params?: GetCoffeeListRequestParams) => Promise<void>;
  setParams: (params?: GetCoffeeListRequestParams) => void;
};

type CoffeeStore = CoffeeState & CoffeeActions;

const coffeeSlice: StateCreator<CoffeeStore, [["zustand/devtools", never]]> = (
  set,
  get
) => ({
  coffeeList: undefined,
  controller: undefined,
  params: {
    text: undefined,
  },
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

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}?${searchParams.toString()}`,
        {
          signal,
        }
      );
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
  setParams: (newParams) => {
    const { params, getCoffeeList } = get();
    set(
      {
        params: {
          ...params,
          ...newParams,
        },
      },
      false,
      "setParams"
    );
    getCoffeeList(params);
  },
});

export const useCoffeeStore = create<CoffeeStore>()(
  devtools(coffeeSlice, { name: "CoffeeStore" })
);

export const getCoffeeList = useCoffeeStore.getState().getCoffeeList;

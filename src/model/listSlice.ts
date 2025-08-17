import { type StateCreator } from "zustand";
import type { ListSlice, OrderSlice } from "./types";

export const listSlice: StateCreator<
  OrderSlice & ListSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  ListSlice
> = (set, get) => ({
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
      for (const key in params) {
        const paramsKey = key as keyof typeof params;
        if (!params[paramsKey]) continue;
        searchParams.set(key, params[paramsKey]);
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

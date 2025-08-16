import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ListSlice, OrderSlice } from "./types";
import { listSlice } from "./listSlice";
import { ordersSlice } from "./orderSlice";

export const useCoffeeStore = create<ListSlice & OrderSlice>()(
  devtools(
    persist(
      (...args) => ({
        ...listSlice(...args),
        ...ordersSlice(...args),
      }),
      {
        name: "CoffeeStore",
        partialize: (state) => ({
          orders: state.orders,
          address: state.address,
        }),
      }
    ),
    {
      name: "CoffeeStore",
    }
  )
);

export const getCoffeeList = useCoffeeStore.getState().getCoffeeList;

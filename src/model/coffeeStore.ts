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
export const setParams = useCoffeeStore.getState().setParams;
export const addOrder = useCoffeeStore.getState().addOrder;
export const clearOrders = useCoffeeStore.getState().clearOrders;
export const addAddress = useCoffeeStore.getState().addAddress;
export const makeOrder = useCoffeeStore.getState().makeOrder;

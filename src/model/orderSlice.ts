import { type StateCreator } from "zustand";
import type {
  OrderCoffeeRequestParams,
  OrderCoffeeResponse,
  OrderItem,
} from "../types/orderTypes";
import type { OrderSlice, ListSlice, OrderState } from "./types";

const ORDERS_URL = `${import.meta.env.VITE_BASE_URL}/order`;

const INITIAL_STATE: OrderState = {
  orders: [],
  address: "",
  currentId: 1,
};

export const ordersSlice: StateCreator<
  OrderSlice & ListSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  OrderSlice
> = (set, get) => ({
  ...INITIAL_STATE,
  addOrder: (order) => {
    const { currentId } = get();
    set(
      (state) => {
        const newOrder: OrderItem = {
          ...order,
          id: currentId,
        };
        return {
          orders: [...state.orders, newOrder],
          currentId: currentId + 1,
        };
      },
      false,
      "addOrder"
    );
  },
  addAddress: (address) => {
    set({ address }, false, "addAddress");
  },
  clearOrders: () => {
    set(INITIAL_STATE, false, "clearOrders");
  },
  makeOrder: () => {
    const { address, orders } = get();
    const data = {
      address,
      orderItems: orders,
    } satisfies OrderCoffeeRequestParams;

    return fetch(ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не получилось сделать заказ");
        }
        return response.json() as Promise<OrderCoffeeResponse>;
      })
      .then((data: OrderCoffeeResponse) => {
        set(INITIAL_STATE, false, "makeOrder");
        return data;
      })
      .catch((error) => {
        console.error("Error making order:", error);
        throw error;
      });
  },
});

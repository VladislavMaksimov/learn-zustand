import { type StateCreator } from "zustand";
import type {
  OrderCoffeeRequestParams,
  OrderCoffeeResponse,
} from "../types/orderTypes";
import type { OrderSlice, ListSlice, OrderState } from "./types";
import { produce } from "immer";

const ORDERS_URL = `${import.meta.env.VITE_BASE_URL}/order`;

const INITIAL_STATE: OrderState = {
  orders: [],
  address: "",
};

export const ordersSlice: StateCreator<
  OrderSlice & ListSlice,
  [],
  [],
  OrderSlice
> = (set, get) => ({
  ...INITIAL_STATE,
  addOrder: (order) => {
    set(
      produce<OrderState>((draft) => {
        if (!draft.orders) {
          draft.orders = [];
        }
        const itemIndex = draft.orders.findIndex(
          (item) => item.id === order.id
        );
        if (itemIndex !== -1) {
          draft.orders[itemIndex].quantity += order.quantity;
          return;
        }
        draft.orders.push(order);
      }),
      false
    );
  },
  addAddress: (address) => {
    set({ address }, false);
  },
  clearOrders: () => {
    set(INITIAL_STATE, false);
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
        set(INITIAL_STATE, false);
        return data;
      })
      .catch((error) => {
        console.error("Error making order:", error);
        throw error;
      });
  },
});

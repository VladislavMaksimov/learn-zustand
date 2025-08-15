import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  OrderCoffeeRequestParams,
  OrderCoffeeResponse,
  OrderItem,
} from "../types/orderTypes";

const ORDERS_URL = `${import.meta.env.VITE_BASE_URL}/order`;

type OrderState = {
  currentId: number;
  orders: OrderItem[];
};

type OrderActions = {
  addOrder: (order: Omit<OrderItem, "id">) => void;
  clearOrders: VoidFunction;
  makeOrder: (params: OrderCoffeeRequestParams) => Promise<OrderCoffeeResponse>;
};

type OrdersStore = OrderState & OrderActions;

const INITIAL_STATE: OrderState = {
  orders: [],
  currentId: 1,
};

const ordersSlice: StateCreator<
  OrdersStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  ...INITIAL_STATE,
  addOrder: (order) => {
    const { currentId } = get();
    set((state) => {
      const newOrder: OrderItem = {
        ...order,
        id: currentId,
      };
      return {
        orders: [...state.orders, newOrder],
        currentId: currentId + 1,
      };
    });
  },
  clearOrders: () => {
    set(INITIAL_STATE);
  },
  makeOrder: (params) => {
    return fetch(ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не получилось сделать заказ");
        }
        return response.json() as Promise<OrderCoffeeResponse>;
      })
      .then((data: OrderCoffeeResponse) => {
        set(INITIAL_STATE);
        return data;
      })
      .catch((error) => {
        console.error("Error making order:", error);
        throw error;
      });
  },
});

export const useOrdersStore = create<OrdersStore>()(
  devtools(persist(ordersSlice, { name: "OrdersStore" }), {
    name: "OrdersStore",
  })
);

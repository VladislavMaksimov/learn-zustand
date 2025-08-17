import type {
  CoffeeType,
  GetCoffeeListRequestParams,
} from "../types/coffeeTypes";
import type { OrderItem, OrderCoffeeResponse } from "../types/orderTypes";

export type OrderState = {
  orders: OrderItem[];
  address: string;
};

type OrderActions = {
  addOrder: (order: OrderItem) => void;
  clearOrders: VoidFunction;
  makeOrder: () => Promise<OrderCoffeeResponse>;
  addAddress: (address: string) => void;
};

export type OrderSlice = OrderState & OrderActions;

type ListState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  params: GetCoffeeListRequestParams;
};

type ListActions = {
  getCoffeeList: (params?: GetCoffeeListRequestParams) => Promise<void>;
  setParams: (params?: GetCoffeeListRequestParams) => void;
};

export type ListSlice = ListState & ListActions;

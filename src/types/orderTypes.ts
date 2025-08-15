export type OrderItem = {
  id: number;
  name: string;
  size: "L";
  quantity: number;
};

export type OrderCoffeeRequestParams = {
  address: string;
  orderItems: OrderItem[];
};

export type OrderCoffeeResponse = {
  message: string;
  success: boolean;
};

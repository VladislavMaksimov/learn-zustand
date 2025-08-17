export enum CoffeeCategoryEnum {
  CAPPUCCINO = "cappuccino",
  LATTE = "latte",
  MACCHIATO = "macchiato",
  AMERICANO = "americano",
}

export type CoffeeType = {
  id: number;
  name: string;
  subTitle: string;
  type: string;
  price: number;
  image: string;
  rating: number;
};

export type GetCoffeeListRequestParams = {
  text?: string;
  type?: CoffeeCategoryEnum;
};

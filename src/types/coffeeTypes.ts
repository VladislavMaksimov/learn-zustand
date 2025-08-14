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
};

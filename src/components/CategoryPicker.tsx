import { useShallow } from "zustand/shallow";
import { getCoffeeList, useCoffeeStore } from "../model/coffeeStore";
import { Select } from "antd";
import { CoffeeCategoryEnum } from "../types/coffeeTypes";
import { useEffect } from "react";
import { useUrlStorage } from "../helpers/useUrlStorate";

export const CategoryPicker = () => {
  const [params, setParams] = useCoffeeStore(
    useShallow((state) => [state.params, state.setParams])
  );

  useEffect(() => {
    getCoffeeList(params);
  }, [params]);

  useUrlStorage(params, setParams);

  const handleCategoryChange = (value: CoffeeCategoryEnum) => {
    setParams({ type: value });
  };

  const categories = Object.entries(CoffeeCategoryEnum);

  const options = categories.map((category) => ({
    label: category[1],
    value: category[1],
  }));

  return (
    <Select
      allowClear
      placeholder="Выберите категорию"
      options={options}
      value={params.type}
      onChange={handleCategoryChange}
    />
  );
};

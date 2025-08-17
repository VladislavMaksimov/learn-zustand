import { Input } from "antd";
import { getCoffeeList, setParams, useCoffeeStore } from "../model/coffeeStore";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { useUrlStorage } from "../helpers/useUrlStorate";

export const SearchInput = () => {
  const [params] = useCoffeeStore(useShallow((state) => [state.params]));

  useEffect(() => {
    getCoffeeList(params);
  }, [params]);

  useUrlStorage(params, setParams);

  return (
    <>
      <Input
        placeholder="поиск"
        value={params.text}
        onChange={(event) => {
          setParams({ text: event.target.value });
        }}
      />
    </>
  );
};

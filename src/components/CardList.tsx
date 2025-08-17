import { useShallow } from "zustand/shallow";
import { useCoffeeStore } from "../model/coffeeStore";
import { CoffeeCard } from "./CoffeeCard";

export const CardList = () => {
  const [coffeeList] = useCoffeeStore(
    useShallow((state) => [state.coffeeList])
  );

  return (
    <div className="cardsContainer">
      {coffeeList?.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
};

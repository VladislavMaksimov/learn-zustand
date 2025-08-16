import { Input } from "antd";
import "./App.css";
import { useEffect } from "react";
import { useUrlStorage } from "./helpers/useUrlStorate";
import { CoffeeCard } from "./components/CoffeeCard";
import { Cart } from "./components/Cart";
import { useCoffeeStore } from "./model/coffeeStore";

function App() {
  const { coffeeList, params, getCoffeeList, setParams } = useCoffeeStore();
  useEffect(() => {
    getCoffeeList(params);
  }, [getCoffeeList, params]);

  useUrlStorage(params, setParams);

  return (
    <div className="wrapper">
      <Input
        placeholder="поиск"
        value={params.text}
        onChange={(event) => {
          setParams({ text: event.target.value });
        }}
      />
      <div style={{ display: "flex" }}>
        <div className="cardsContainer">
          {coffeeList?.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
        <Cart />
      </div>
    </div>
  );
}

export default App;

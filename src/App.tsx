import "./App.css";
import { addTen } from "./helpers/addTen";
import { useCounterStore } from "./model/counterStore";

function App() {
  const { counter, increment, decrement } = useCounterStore();
  return (
    <div className="wrapper">
      <button onClick={increment}>+</button>
      <span>{counter}</span>
      <button onClick={decrement}>-</button>
      <button onClick={addTen}>Add ten</button>
    </div>
  );
}

export default App;

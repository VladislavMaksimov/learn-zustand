import "./App.css";
import { Cart } from "./components/Cart";
import { SearchInput } from "./components/SearchInput";
import { CardList } from "./components/CardList";

function App() {
  return (
    <div className="wrapper">
      <SearchInput />
      <div style={{ display: "flex" }}>
        <CardList />
        <Cart />
      </div>
    </div>
  );
}

export default App;

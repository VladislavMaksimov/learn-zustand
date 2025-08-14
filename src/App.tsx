import { Button, Card, Input, Rate, Tag } from "antd";
import "./App.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");

  const { coffeeList, getCoffeeList } = useCoffeeStore();
  useEffect(() => {
    getCoffeeList({ text: searchText });
  }, [getCoffeeList, searchText]);
  return (
    <div className="wrapper">
      <Input
        placeholder="поиск"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />
      <div className="cardsContainer">
        {coffeeList?.map((coffee) => (
          <Card
            key={coffee.id}
            cover={<img alt={coffee.name} src={coffee.image} />}
            actions={[
              <Button icon={<ShoppingCartOutlined />}>{coffee.price}</Button>,
            ]}
          >
            <Card.Meta title={coffee.name} description={coffee.subTitle} />
            <Tag color="purple" style={{ marginTop: 12 }}>
              {coffee.type}
            </Tag>
            <Rate defaultValue={coffee.rating} disabled allowHalf />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;

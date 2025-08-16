import { Button, Card, Input, Rate, Tag } from "antd";
import "./App.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect, useState } from "react";
import { useOrdersStore } from "./model/orderStore";
import { useUrlStorage } from "./helpers/useUrlStorate";

function App() {
  const [address, setAddress] = useState("");

  const { coffeeList, params, getCoffeeList, setParams } = useCoffeeStore();
  useEffect(() => {
    getCoffeeList(params);
  }, [getCoffeeList, params]);

  useUrlStorage(params, setParams);

  const { orders, addOrder, clearOrders, makeOrder } = useOrdersStore();

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
            <Card
              key={coffee.id}
              cover={<img alt={coffee.name} src={coffee.image} />}
              actions={[
                <Button
                  icon={<ShoppingCartOutlined />}
                  onClick={() => {
                    addOrder({
                      name: coffee.name,
                      size: "L",
                      quantity: 1,
                    });
                  }}
                >
                  {coffee.price}
                </Button>,
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
        <aside className="cart">
          <h1>Заказ</h1>
          {orders.length > 0 ? (
            <>
              {orders.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
              <Input
                placeholder="адрес"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <Button
                type="primary"
                disabled={!address}
                onClick={async () => {
                  if (!address) {
                    alert("Пожалуйста, введите адрес доставки");
                    return;
                  }
                  try {
                    const response = await makeOrder({
                      address,
                      orderItems: orders,
                    });
                    if (!response.success) {
                      alert("Ошибка при создании заказа: " + response.message);
                      alert(response.message);
                      return;
                    }
                    alert(response.message);
                  } catch (error) {
                    const errorMessage =
                      typeof error === "string"
                        ? error
                        : error instanceof Error
                        ? error.message
                        : "неизвестная ошибка";
                    alert("Ошибка при создании заказа: " + errorMessage);
                  }
                }}
              >
                Сделать заказ
              </Button>
              <Button onClick={clearOrders}>Очистить корзину</Button>
            </>
          ) : (
            <span>Добавьте напитки</span>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;

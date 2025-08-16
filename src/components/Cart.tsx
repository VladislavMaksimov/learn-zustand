import { Input, Button } from "antd";
import { useCoffeeStore } from "../model/coffeeStore";

export const Cart = () => {
  const { orders, address, clearOrders, makeOrder, addAddress } =
    useCoffeeStore();

  return (
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
              addAddress(event.target.value);
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
                const response = await makeOrder();
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
  );
};

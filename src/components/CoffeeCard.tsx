import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Button, Tag, Rate } from "antd";
import { type FC } from "react";
import type { CoffeeType } from "../types/coffeeTypes";
import { useCoffeeStore } from "../model/coffeeStore";

interface CoffeeCardProps {
  coffee: CoffeeType;
}

export const CoffeeCard: FC<CoffeeCardProps> = ({ coffee }) => {
  const { addOrder } = useCoffeeStore();
  return (
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
  );
};

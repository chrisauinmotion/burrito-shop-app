import { FoodItem } from "@/models/FoodItem";
import { Option } from "@/models/Option";
import { Card, CardContent, CardHeader } from "@mui/material";
import Image from "next/image";

export default function FoodCard({
  id,
  name,
  imageSrc,
  price,
  cal,
  onSelect,
  options,
  isSelected,
}: {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  cal: number;
  options: Option[];
  onSelect: (foodItem: FoodItem) => void;
  isSelected: boolean;
}) {
  return (
    <Card
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
      className={isSelected ? "w-full bg-gray-200" : "w-full"}
      onClick={() => onSelect({ id, name, imageSrc, price, cal, options })}
    >
      <CardHeader title={name} />
      <CardContent>
        <Image
          alt={name}
          className="h-64 w-full"
          height="300"
          src={imageSrc}
          width="300"
        />
        <div className="m-2 flex justify-between">
          <p>${price}</p>
          <p>{cal} cal</p>
        </div>
      </CardContent>
    </Card>
  );
}

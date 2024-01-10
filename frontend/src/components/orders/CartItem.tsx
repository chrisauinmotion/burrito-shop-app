import { Card, CardContent, Typography, Button } from "@mui/material";
import { useOrder } from "./OrderContext";
import { FoodItem } from "@/models/FoodItem";

export default function CartItem({
  id,
  name,
  price,
  selectedOptions,
}: FoodItem) {
  const { handleRemoveFoodItem } = useOrder();
  return (
    <Card className="p-4 border border-gray-200 rounded-md h-auto w-96">
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h6" component="h3">
            {name} Burrito
          </Typography>
          <Typography variant="h6" component="p">
            ${price}
          </Typography>
        </div>
        {selectedOptions?.length && (
          <Typography variant="body2" color="text.secondary" className="mb-4">
            w/ {selectedOptions.map((option: any) => option.name).join(", ")}
          </Typography>
        )}
        <div className="flex space-x-2">
          <Button
            className="text-black"
            variant="text"
            color="inherit"
            onClick={() => handleRemoveFoodItem(id)}
          >
            REMOVE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

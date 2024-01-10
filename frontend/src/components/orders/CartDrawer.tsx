import { Drawer, Button } from "@mui/material";
import CartItem from "./CartItem";
import { useOrder } from "./OrderContext";
import { Dispatch, SetStateAction, useState } from "react";

export default function CartDrawer({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
}) {
  const { selectedFoodItems } = useOrder();
  const [placedOrder, setPlacedOrder] = useState(false);
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose(false)}>
      <div className="p-6 w-102">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <div className="flex flex-col space-y-2 justify-center items-center">
          {selectedFoodItems.length ? (
            selectedFoodItems.map((foodItem) => (
              <CartItem key={foodItem.id} {...foodItem} />
            ))
          ) : placedOrder ? (
            <h1>Order has successfully been placed</h1>
          ) : (
            <h1>Empty</h1>
          )}
        </div>
        <div className="mt-6 border-black border-t-2 p-4">
          {!placedOrder && (
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Total</p>
              <p className="text-xl font-bold">
                $
                {selectedFoodItems.length
                  ? selectedFoodItems.reduce(
                      (total: number, curItem) => curItem.price + total,
                      0
                    )
                  : 0}
              </p>
            </div>
          )}
          <div className="flex justify-center">
            {placedOrder ? (
              <Button
                variant="outlined"
                className="text-black"
                color="inherit"
                onClick={() => {
                  onClose(!open)
                  setPlacedOrder(false);
                }}
              >
                Start New Order
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="text-black"
                color="inherit"
                onClick={() => {
                  onSubmit();
                  setPlacedOrder(true);
                }}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

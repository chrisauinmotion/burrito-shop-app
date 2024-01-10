"use client"
import { FoodItem, SelectedFoodItems } from "@/models/FoodItem";
import axios from "axios";
import { createContext, useState, useContext } from "react";
type OrderContext = {
  selectedFoodItems: SelectedFoodItems;
  handleAddFoodItem: (item: FoodItem) => void;
  handleRemoveFoodItem: (itemId: string) => void
  createOrderRequest: () => Promise<any>
  reset: () => void
}
const OrderContext = createContext<OrderContext>({} as OrderContext);

export function OrderProvider({ children }: any) {
  const [selectedFoodItems, setSelectedFoodItems] = useState<SelectedFoodItems>([]);

  const handleAddFoodItem = (item: FoodItem) => {
    setSelectedFoodItems([...selectedFoodItems, item]);
  };

  const handleRemoveFoodItem = (itemId: string) => {
    setSelectedFoodItems(selectedFoodItems.filter((item) => item.id !== itemId));
  };

  const createOrderRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/orders', {
        totalCost: selectedFoodItems.reduce((total, curFoodItem) => curFoodItem.price + total, 0),
        items: selectedFoodItems.map((foodItem) => ({ burritoId: foodItem.id, options: foodItem.options.map(({ id }) => ({ id }))}))
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  };

  const reset = () => {
    setSelectedFoodItems([]);
  }

  return (
    <OrderContext.Provider value={{ selectedFoodItems, handleAddFoodItem, handleRemoveFoodItem, createOrderRequest, reset }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
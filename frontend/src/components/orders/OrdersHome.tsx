"use client";
import { Button, Badge } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import ShoppingCartIcon from "../icons/ShoppingCart";
import { useEffect, useState } from "react";
import LocateIcon from "../icons/Locate";
import FoodCard from "./FoodCard";
import CartDrawer from "./CartDrawer";
import OptionCard from "./OptionCard";
import { useOrder } from "./OrderContext";
import { FoodItem } from "@/models/FoodItem";
import { SelectedOptions, Option } from "@/models/Option";

export default function OrdersHome() {
  const { selectedFoodItems, handleAddFoodItem, createOrderRequest, reset } = useOrder();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([]);
  const [burritoData, setBurritoData] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchBurritoData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/burritos");
        setBurritoData(response.data as FoodItem[]);
      } catch (error) {
        console.error("Failed to fetch burrito data:", error);
      }
    };

    fetchBurritoData();
  }, []);

  const handleSelectFoodItem = (item: FoodItem) => {
    if (selectedItem && item.id === selectedItem.id) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem({ ...item, selectedOptions });
    }
  };

  const handleAddOption = (option: Option) => {
    if (selectedItem) {
      const newOptionsList = [...selectedOptions, option];
      setSelectedOptions(newOptionsList);
      setSelectedItem({ ...selectedItem, selectedOptions: newOptionsList });
    }
  };

  const handleRemoveOption = (optionId: string) => {
    setSelectedOptions(
      selectedOptions.filter((option: Option) => option.id !== optionId)
    );
  };

  const handleAddFoodItemToCart = (item: FoodItem) => {
    handleAddFoodItem(item);
    setSelectedItem(undefined);
    setSelectedOptions([]);
  };

  return (
    <div className="bg-white text-black">
      <div className="flex justify-end items-center border-b py-4 px-8">
        <div className="flex items-center space-x-4">
          <LocateIcon className="text-gray-600" />
          <p className="text-sm">Pickup From ...</p>
          <Button variant="text" onClick={() => setToggleDrawer(!toggleDrawer)}>
            <Badge badgeContent={selectedFoodItems.length} color="error">
              <ShoppingCartIcon className="text-gray-600" />
            </Badge>
          </Button>
          <CartDrawer open={toggleDrawer} onClose={setToggleDrawer} onSubmit={async () => {
            await createOrderRequest();
            reset();
            setSelectedItem(undefined);
            setSelectedOptions([]);
          }} />
        </div>
      </div>
      <div className="py-8 px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-bold">BUILD YOUR BURRITO</h1>
          <Image
            alt="Burrito"
            className="h-64"
            height="600"
            src="/burrito-shop-main.jpeg"
            style={{
              aspectRatio: "1200/600",
              objectFit: "cover",
            }}
            width="1200"
          />
        </div>
        <p className="mb-6">
          Your choice of freshly grilled meat wrapped in a warm flour tortilla
          with rice, beans, or fajita veggies, and topped with guac, salsa,
          queso blanco, sour cream or cheese.
        </p>
        <div className="border-t border-b py-4 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">PROTEIN</h2>
            <p className="mb-2">Choose one</p>
            <div className="grid grid-cols-4 gap-4">
              {burritoData.map((burrito) => (
                <FoodCard
                  key={burrito.id}
                  isSelected={selectedItem?.id === burrito.id}
                  onSelect={handleSelectFoodItem}
                  {...burrito}
                />
              ))}
            </div>
          </div>

          {selectedItem && (
            <div>
              <h2 className="text-2xl font-bold mb-2">OPTIONS</h2>
              <p className="mb-2">Add to your heart&apos;s desire</p>
              <div className="grid grid-cols-4 gap-4">
                {selectedItem.options.map((option: Option) => {
                  return (
                    <OptionCard
                      key={option.id}
                      isSelected={
                        !!selectedItem?.selectedOptions &&
                        selectedOptions.some(
                          (selectedOption: Option) =>
                            selectedOption.id === option.id
                        )
                      }
                      onSelect={() => {
                        if (
                          !selectedOptions.some(
                            (selectedOption: Option) =>
                              option.id === selectedOption.id
                          )
                        ) {
                          handleAddOption(option);
                        } else {
                          handleRemoveOption(option.id);
                        }
                      }}
                      {...option}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center py-4">
          <div>
            <h3 className="text-xl font-bold">YOUR MEAL</h3>
            <p>
              {selectedItem
                ? `${selectedItem.name} BURRITO ${
                    selectedOptions.length
                      ? `w/ ${selectedOptions
                          .map((option: Option) => option.name)
                          .join(", ")}`
                      : ""
                  }`
                : "Start Building your burrito!"}
            </p>
          </div>
          <Button
            className="text-black"
            variant="outlined"
            color="inherit"
            onClick={() => selectedItem && handleAddFoodItemToCart(selectedItem)}
            disabled={!selectedItem}
          >
            Add to Bag
          </Button>
        </div>
      </div>
    </div>
  );
}

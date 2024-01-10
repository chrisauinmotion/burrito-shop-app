import { SelectedOptions, Option } from "./Option";

export type FoodItem = {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  cal: number;
  options: Option[];
  selectedOptions?: SelectedOptions
};

export type SelectedFoodItems = FoodItem[];
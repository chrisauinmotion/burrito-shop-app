import { Card, CardContent, CardHeader } from "@mui/material";
import Image from "next/image";

export default function OptionCard({
  name,
  imageSrc,
  cal,
  onSelect,
  isSelected
}: {
  name: string;
  imageSrc: string;
  cal: number;
  onSelect: () => void;
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
      onClick={onSelect}
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
        <div className="m-2 flex justify-end">
          <p>{cal} cal</p>
        </div>
      </CardContent>
    </Card>
  );
}

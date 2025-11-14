"use client";

import { ShoppingItem, ItemStatus } from "@/app/types";
import ItemCard from "./ItemCard";

interface CategorySectionProps {
  title: string;
  items: ShoppingItem[];
  status: ItemStatus;
  onStatusChange: (id: string, status: ItemStatus) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
}

export default function CategorySection({
  title,
  items,
  status,
  onStatusChange,
  onEdit,
  onDelete,
}: CategorySectionProps) {
  if (items.length === 0) {
    return null;
  }

  const getTitleColor = () => {
    switch (status) {
      case "to-buy":
        return "text-green-700 dark:text-green-400";
      case "not-needed":
        return "text-red-700 dark:text-red-400";
      case "purchased":
        return "text-blue-700 dark:text-blue-400";
    }
  };

  return (
    <div className="mb-6">
      <h2 className={`text-2xl font-bold mb-4 ${getTitleColor()}`}>
        {title} ({items.length})
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}


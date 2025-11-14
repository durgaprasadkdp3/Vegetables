"use client";

import { ShoppingItem, ItemStatus } from "@/app/types";
import { useState } from "react";

interface ItemCardProps {
  item: ShoppingItem;
  onStatusChange: (id: string, status: ItemStatus) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
}

export default function ItemCard({
  item,
  onStatusChange,
  onEdit,
  onDelete,
}: ItemCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusColor = (status: ItemStatus) => {
    switch (status) {
      case "to-buy":
        return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700";
      case "not-needed":
        return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700";
      case "purchased":
        return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700";
    }
  };

  const getStatusTextColor = (status: ItemStatus) => {
    switch (status) {
      case "to-buy":
        return "text-green-800 dark:text-green-200";
      case "not-needed":
        return "text-red-800 dark:text-red-200";
      case "purchased":
        return "text-blue-800 dark:text-blue-200";
    }
  };

  const handleStatusChange = (newStatus: ItemStatus) => {
    onStatusChange(item.id, newStatus);
    
    // Vibration feedback for mobile
    if (newStatus === "purchased" && "vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleDelete = () => {
    onDelete(item.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        className={`p-4 rounded-lg border-2 ${getStatusColor(
          item.status
        )} mb-3 shadow-sm`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {item.name}
            </h3>
            {item.quantity && (
              <p className="text-base text-gray-700 dark:text-gray-300 mb-1">
                {item.quantity}
              </p>
            )}
            {item.note && (
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                {item.note}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {item.status !== "to-buy" && (
            <button
              onClick={() => handleStatusChange("to-buy")}
              className="flex-1 min-w-[100px] px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-base transition-colors active:scale-95"
            >
              To Buy
            </button>
          )}
          {item.status !== "not-needed" && (
            <button
              onClick={() => handleStatusChange("not-needed")}
              className="flex-1 min-w-[100px] px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-base transition-colors active:scale-95"
            >
              Not Needed
            </button>
          )}
          {item.status !== "purchased" && (
            <button
              onClick={() => handleStatusChange("purchased")}
              className="flex-1 min-w-[100px] px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-base transition-colors active:scale-95"
            >
              Purchased
            </button>
          )}
          <button
            onClick={() => onEdit(item)}
            className="px-4 py-2.5 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg text-base transition-colors active:scale-95"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-base transition-colors active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Delete Item?
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
              Are you sure you want to delete {'"'}{item.name}{'"'}? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg text-base transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-base transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


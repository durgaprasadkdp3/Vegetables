"use client";

import { useState, useEffect, useMemo } from "react";
import { ShoppingItem, ItemStatus } from "./types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { parseInitialData } from "@/utils/initialData";
import SearchBar from "@/components/SearchBar";
import CategorySection from "@/components/CategorySection";
import AddItemModal from "@/components/AddItemModal";

export default function Home() {
  const [items, setItems, isLoading] = useLocalStorage<ShoppingItem[]>(
    "vegetable-shopping-list",
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize with default data if localStorage is empty
  useEffect(() => {
    if (!isLoading && !isInitialized && items.length === 0) {
      const initialData = parseInitialData();
      setItems(initialData);
      setIsInitialized(true);
    } else if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading, items.length, isInitialized, setItems]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.quantity.toLowerCase().includes(query) ||
        item.note?.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  // Group items by status with auto-sorting
  const itemsByStatus = useMemo(() => {
    const grouped = {
      "to-buy": [] as ShoppingItem[],
      "not-needed": [] as ShoppingItem[],
      purchased: [] as ShoppingItem[],
    };

    filteredItems.forEach((item) => {
      grouped[item.status].push(item);
    });

    // Sort: to-buy by name, purchased by name (reverse for bottom placement)
    grouped["to-buy"].sort((a, b) => a.name.localeCompare(b.name));
    grouped["not-needed"].sort((a, b) => a.name.localeCompare(b.name));
    grouped.purchased.sort((a, b) => a.name.localeCompare(b.name));

    return grouped;
  }, [filteredItems]);

  const handleAddItem = (
    itemData: Omit<ShoppingItem, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = Date.now();
    if (editingItem) {
      // Update existing item
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...itemData, updatedAt: now }
            : item
        )
      );
      setEditingItem(null);
    } else {
      // Add new item
      const newItem: ShoppingItem = {
        ...itemData,
        id: `item-${now}-${Math.random()}`,
        createdAt: now,
        updatedAt: now,
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  const handleStatusChange = (id: string, status: ItemStatus) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, updatedAt: Date.now() } : item
      )
    );
  };

  const handleEdit = (item: ShoppingItem) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingItem(null);
  };

  // Dark mode detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    updateTheme(mediaQuery);
    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
            🥬 Vegetable Shopping List
          </h1>
        </div>
      </header>

      {/* Search Bar */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Main Content */}
      <main className="px-4 py-6 max-w-4xl mx-auto">
        {/* To Buy Today - Always on top */}
        <CategorySection
          title="To Buy Today"
          items={itemsByStatus["to-buy"]}
          status="to-buy"
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Not Needed Today */}
        <CategorySection
          title="Not Needed Today"
          items={itemsByStatus["not-needed"]}
          status="not-needed"
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Purchased - Always at bottom */}
        <CategorySection
          title="Purchased"
          items={itemsByStatus.purchased}
          status="purchased"
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {searchQuery
                ? "No items found matching your search."
                : "No items in your list. Add one to get started!"}
            </p>
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-3xl font-bold transition-all active:scale-90 z-40"
        aria-label="Add new item"
      >
        +
      </button>

      {/* Add/Edit Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddItem}
        editingItem={editingItem}
      />
    </div>
  );
}


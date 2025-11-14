export type ItemStatus = "to-buy" | "not-needed" | "purchased";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  note?: string;
  status: ItemStatus;
  createdAt: number;
  updatedAt: number;
}


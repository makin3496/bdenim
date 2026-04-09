"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  colorHex: string;
  quantity: number;
  image?: string;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("bdenim-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("bdenim-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.size === newItem.size && i.color === newItem.color
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.size === newItem.size && i.color === newItem.color
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: number, size: string, color: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)));
  };

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

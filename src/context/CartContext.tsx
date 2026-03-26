import React, { createContext, useContext, useEffect, useState } from 'react';
import type { variant } from '../types/product';

interface CartContextType {
  items: CartItem[];
  addItem: (variant: variant) => void;
  removeItem: (variant: variant) => void;
  clearCart: () => void;
  itemsCount: number;
  isOpen: boolean;
  toggleCart: () => void;
}

interface CartItem {
  variantId: string | number;
  quantity: number;
  variant: variant;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (variant: variant, amount: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.variantId === variant.id);

      if (existingItem) {
        return prev.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [...prev, { variantId: variant.id, quantity: amount, variant }];
    });
  };

  const removeItem = (variant: variant, amount: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.variantId === variant.id);

      if (!existingItem) return prev;

      if (existingItem.quantity > amount) {
        return prev.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity - amount }
            : item
        );
      }

      return prev.filter((item) => item.variantId !== variant.id);
    });
  };

  const clearCart = () => setItems([]);

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    clearCart,
    itemsCount: items.length,
    isOpen,
    toggleCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export default CartContext;

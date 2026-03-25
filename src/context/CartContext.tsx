import React, { createContext, useContext, useEffect, useState } from 'react';
import type { variant } from '../types/product';

interface CartContextType {
  items: variant[];
  addItem: (variant: variant) => void;
  removeItem: (variantId: number) => void;
  clearCart: () => void;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<variant[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: variant) => {
    setItems((prev) => [...prev, product]);
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setItems([]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    clearCart,
    itemsCount: items.length,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export default CartContext;

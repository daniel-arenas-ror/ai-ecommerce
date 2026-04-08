import React, { createContext, useContext, useEffect, useState } from 'react';
import type { variant } from '../types/product';
import { useMutation } from '@apollo/client/react';
import { ADD_TO_CART, REMOVE_TO_CART } from '../api/mutations/Cart'
import type { Cart, CartItem } from '../types/cart'

interface CartContextType {
  cart: Cart | undefined;
  items: CartItem[];
  addItem: (variant: variant) => void;
  removeItem: (variant: variant) => void;
  clearCart: () => void;
  itemsCount: number;
  isOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart>()
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted: (data) => {
      console.log('Successfully added to cart:', data);
      setCart(data.addToCart)
    },
    onError: (error) => {
      console.error('Error adding to cart:', error);
    }
  });
  const [removeToCart] = useMutation(REMOVE_TO_CART, {
    onCompleted: (data) => {
      console.log('Successfully removed to cart:', data);
      setCart(data.addToCart)
    },
    onError: (error) => {
      console.error('Error adding to cart:', error);
    }
  });

  const addItem = (variant: variant, amount: number = 1) => {
    console.log('Adding to cart:', variant, 'Amount:', amount);

    addToCart({ variables: { variantId: variant.id, quantity: amount } });
  };

  const removeItem = (variant: variant, amount: number = 1) => {
    removeToCart({ variables: { variantId: variant.id, quantity: amount } });
  };

  const clearCart = () => setItems([]);

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  const value: CartContextType = {
    cart,
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

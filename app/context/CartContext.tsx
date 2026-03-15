'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
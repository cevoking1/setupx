'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Сохраняем корзину в память браузера, чтобы при обновлении она не исчезала
  useEffect(() => {
    const saved = localStorage.getItem('setupx-cart');
    if (saved) setCart(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('setupx-cart', JSON.stringify(cart));
  }, [cart, isLoaded]);

  const addToCart = (product: any) => {
    // Добавляем уникальный ключ для каждого элемента (чтобы можно было удалить два одинаковых товара по отдельности)
    const cartItem = { ...product, cartId: Math.random().toString(36).substr(2, 9) };
    setCart((prev) => [...prev, cartItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('setupx-cart');
  };

  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, isLoaded }}>
      {children}
    </CartContext.Provider>
  );
}

// Хук для использования корзины
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
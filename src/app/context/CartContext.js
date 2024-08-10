'use client';

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalAmount: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

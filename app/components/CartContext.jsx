import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// CartProvider component to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initial empty cart

  // Function to add an item to the cart
  const addItemToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity; // Increment the quantity if item exists
        return updatedCart;
      }

      // If item doesn't exist, add it to the cart
      return [...prevCart, { product, quantity }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to add item to cart and trigger slider to open
  const addItemToCart = async (variantId, quantity) => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        lineItems: [{ variantId, quantity }],
      }),
    });

    const updatedCart = await response.json();
    setCart(updatedCart);
    setIsCartOpen(true); // Open the cart slider when an item is added
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
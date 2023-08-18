"use client"
import product from '@/sanity/schemas/product';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const Context = createContext({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  onRemove: () => {},
  onAdd: () => {},
  setShowCart: () => {},
});

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);


  const updateTotalQuantities = () => {
    const updatedTotalQuantities = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantities(updatedTotalQuantities);
  };

  useEffect(() => {
    updateTotalQuantities();
  }, [cartItems]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === product._id ? { ...cartProduct, quantity: cartProduct.quantity + quantity } : cartProduct
      );

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };
  

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCartItems);
  };
  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === itemId
        ? { ...cartItem, quantity: cartItem.quantity - 1 < 1 ? 1 : cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };
  
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities, 
        increaseQuantity,
        decreaseQuantity,
        onAdd,
       
      }}
    >
      <Toaster/>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

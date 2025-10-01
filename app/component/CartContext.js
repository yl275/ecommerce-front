"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("cartProducts");
    if (storedProducts) {
      setCartProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function subtractProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        const newCart = [...prev];
        newCart.splice(pos, 1);
        return newCart;
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        subtractProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

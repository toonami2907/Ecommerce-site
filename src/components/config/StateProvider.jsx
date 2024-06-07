// StateProvider.jsx
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [hide, setHide] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [cartinfo, setCartinfo] = useState(null);
  const [product, setProduct] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [cartupdate, setCartupdate] = useState(0);
  const userID = localStorage.getItem("userID");

  const fetch_products = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product/v1/products");
      setProduct(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetch_user = async () => {
    if (!userID) return;
    try {
      const response = await axios.get(`http://localhost:8080/auth/user/${userID}`);
      setUserinfo(response.data.user_info);
      setCartinfo(response.data.user_info.cart || []);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetch_user();
    fetch_products();
  }, []);

  const handle_filter = (id) => {
    if (!product) return;
    const filteredItems = product.filter(item => item.category === id);
    setFiltered(filteredItems);
  };

  const productCount = product?.length;

  return (
    <StateContext.Provider value={{
      hide,
      setHide,
      productCount,
      cartinfo,
      filtered,
      handle_filter,
      userinfo,
      userID,
      product,
      cartupdate,
      setCartupdate
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a StateProvider');
  }
  return context;
};

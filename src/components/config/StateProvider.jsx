// StateProvider.jsx
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [hide, setHide] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [cartinfo, setCartinfo] = useState(null);
  const [product, setProduct] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [cartupdate, setCartupdate] = useState(0);
  const [sortItems, setSortItems] = useState(false);
  const userID = localStorage.getItem("userID");
  const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  const [cookieValue, setCookieValue] = useState("")
  const navigate = useNavigate()

  
  const fetch_products = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-backend-kl4l.onrender.com/product/v1/products",
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      setProduct(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

 useEffect(()=>{
    const value = cookies.user_id;
    setCookieValue(value)
  },[cookies])



  const handle_sort = () => {
    // Ensure product state is not null
    if (product) {
      // Create a copy of the product array to avoid mutating the original state
      const sortedProduct = [...product];
  
      // Sort the product array based on the 'price' property
      sortedProduct.sort((a, b) => a.price - b.price);
  
      // Update the state with the sorted product array
      setFiltered(sortedProduct);
    }
  };
  
  const handle_product_sorted = () => {
    setSortItems(!sortItems);
    if (sortItems === true) {
      handle_sort();
    } else {
      setFiltered(product);
    }
  };
  
  const Handle_price = (priceRange) => {
    let maxPrice;
  
    // Map price range string to max price value
    switch (priceRange) {
      case "$0 - $50":
        maxPrice = 50;
        break;
      case "$50 - $100":
        maxPrice = 100;
        break;
      case "$100 - $150":
        maxPrice = 150;
        break;
      case "$150 - $200":
        maxPrice = 200;
        break;
      case "$250 +":
        maxPrice = 250;
        break;
      default:
        maxPrice = 0;
        break;
    }
  
    // Return early if no valid price range
    if (maxPrice === 0) {
      return;
    }
  
    let PriceFilter;
  
    // Filter products based on the price range
    if (maxPrice <= 200) {
      PriceFilter = filtered.filter(item => item.price < maxPrice);
    } else  {
      PriceFilter = filtered.filter(item => item.price >= maxPrice);
    }
  
    // Update the state with the filtered product array
    setFiltered(PriceFilter);
  };
  
  // console.log(filtered);

  const fetch_user = async () => {
    if (!userID) return;
    try {
      const response = await axios.get(
        `https://ecommerce-backend-kl4l.onrender.com/auth/user/${userID}`,
        { withCredentials: true }
      );
      setUserinfo(response.data.user_info);
      setCartinfo(response.data.user_info.cart || []);
    } catch (error) {
      if (response.status === 403) {
        toast.error("Please Login in Again, Session expired Already....");
        localStorage.setItem("userID", "")
        navigate("/login")
    }
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetch_user();
    fetch_products();
  }, []);

  const handle_sex = (id)=>{
      if(product) return;
      if(!id) return;
      const male = product.filter((item)=> item.sex === id)
      setFiltered(male)
  }
  const handle_accessories = (id)=>{
      if(!id) return;
      if (id!== "Accessories" ) {
        return setFiltered(product)
      }
      const accessories = product.filter((item)=> item.category === id)
      setFiltered(accessories)
  }

  const handle_filter = (id) => {
    if (!product) return;
    if(!id) return;
    const filteredItems = product.filter((item) => item.category === id);
    setFiltered(filteredItems);
  };

  const productCount = product?.length;

  return (
    <StateContext.Provider
      value={{
        hide,
        setHide,
        productCount,
        cartinfo,
        filtered,
        handle_filter,
        handle_product_sorted,
        handle_sort,
        handle_accessories,
        sortItems,
        userinfo,
        userID,
        product,
        cartupdate,
        Handle_price,
        handle_sex,
        setCartupdate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a StateProvider");
  }
  return context;
};

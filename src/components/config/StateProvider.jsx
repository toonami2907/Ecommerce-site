import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [hide, setHide] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [cartinfo, setCartinfo] = useState(null);
  const [product, setProduct] = useState(null); // Initialize with null
  const [filtered, setFiltered] = useState(null); // Initialize with null
  const [cartUpdate, setCartUpdate] = useState(0);
  const [sortItems, setSortItems] = useState(false);
  const [cookieValue, setCookieValue] = useState("");
  const [cookies] = useCookies(["user_id"]);
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/product/v1/products", { withCredentials: true });
        setProduct(response.data);
        setFiltered(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    const value = cookies.user_id;
    setCookieValue(value);
  }, [cookies]);

  const handleSort = useCallback(() => {
    if (product) {
      const sortedProduct = [...product].sort((a, b) => a.price - b.price);
      setFiltered(sortedProduct);
    }
  }, [product]);

  const handleProductSorted = useCallback(() => {
    setSortItems((prevSortItems) => {
      if (prevSortItems) {
        handleSort();
      } else {
        setFiltered(product);
      }
      return !prevSortItems;
    });
  }, [handleSort, product]);

  const handlePrice = useCallback((priceRange) => {
    let maxPrice;

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

    if (maxPrice === 0) return;

    const priceFilter = maxPrice <= 200
      ? filtered.filter((item) => item.price < maxPrice)
      : filtered.filter((item) => item.price >= maxPrice);

    setFiltered(priceFilter);
  }, [filtered]);

  const fetchUser = useCallback(async () => {
    if (!userID) return;
    try {
      const response = await axios.get(`http://localhost:8080/auth/user/${userID}`, { withCredentials: true });
      setUserinfo(response.data?.user_info);
      setCartinfo(response.data.user_info?.cart || []);
    } catch (error) {
      toast.error("Please Login in Again, Session expired Already....");
      localStorage.setItem("userID", "");
      navigate("/login");
      console.error("Failed to fetch user:", error);
    }
  }, [navigate, userID]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSex = useCallback((id) => {
    if (!product || !id) return;
    const filteredItems = product.filter((item) => item.sex === id);
    setFiltered(filteredItems);
  }, [product]);

  const handleAccessories = useCallback((id) => {
    if (!id) return;
    if (id !== "Accessories") {
      setFiltered(product);
    } else {
      const accessories = product.filter((item) => item.category === id);
      setFiltered(accessories);
    }
  }, [product]);

  const handleFilter = useCallback((id) => {
    if (!product || !id) return;
    const filteredItems = product.filter((item) => item.category === id);
    setFiltered(filteredItems);
  }, [product]);

  const productCount = useMemo(() => product?.length, [product]);

  return (
    <StateContext.Provider
      value={{
        hide,
        setHide,
        productCount,
        cartinfo,
        filtered,
        handleFilter,
        handleProductSorted,
        handleSort,
        handleAccessories,
        sortItems,
        userinfo,
        userID,
        product,
        cartUpdate,
        handlePrice,
        handleSex,
        setCartUpdate,
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

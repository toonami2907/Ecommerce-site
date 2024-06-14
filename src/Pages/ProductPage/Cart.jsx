import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../components/config/StateProvider";

export default function Cart({ setCart }) {
  const [cartItems, setCartItems] = useState(null);
  const { setCartUpdate } = useGlobalContext();
  const userID = localStorage.getItem("userID");

    const fetch_user = async () => {
        try {
            const response = await axios.get(`https://ecommerce-backend-kl4l.onrender.com/auth/user/${userID}`,
                { withCredentials: true }
            );
            setCartItems(response.data.user_info.cart || []); // Ensure cart is set even if empty
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                if (message.includes("Invalid token")) {
                  toast.error("Please Login in Again, Session expired Already....");
                }  else {
                  toast.error("Error: " + errorMessage);
                }
              }
        }
    };

  useEffect(() => {
    fetch_user();
  }, []);

  useEffect(() => {
    setCartUpdate(cartItems?.length);
  }, [cartItems, setCartUpdate]);

  const updateCart = async (newCart) => {
    setCartItems(newCart);
  };

    const removeFromCart = async (productId, size) => {
        try {
            const response = await fetch(`https://ecommerce-backend-kl4l.onrender.com/product/v1/Remove`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userID,
                    productId: productId,
                    size: size
                })
            });

      if (response.status === 200) {
        toast.success("Removed from cart successfully");

        // Update local cart state
        const newCart = cartItems.filter(
          (item) => item.productId !== productId || item.size !== size
        );
        updateCart(newCart);
      }
    } catch (error) {
      console.error(error);
    }
  };

    const increaseQuantity = async (productId, size) => {
        try {
            const response = await axios.put(`https://ecommerce-backend-kl4l.onrender.com/product/v1/Increase`, {
                productId,
                size,
                userId: userID
            });

      if (response.status === 200) {
        toast.success("Increased quantity successfully");

        // Update local cart state
        const newCart = cartItems.map((item) => {
          if (item.productId === productId && item.size === size) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        updateCart(newCart);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    return (
      cartItems?.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      ) || 0
    );
  };

  const CheckOut = () => {
    const availableMoney = 100;

    if (!cartItems || cartItems.length === 0) {
      toast.error("Please add items");
    } else if (availableMoney < calculateTotal()) {
      toast.error("No money available");
    } else {
      toast.success("Purchased successfully");
    }
  };

  const close_Cart = () => {
    setCart(false);
  };
  
  return (
    <div className="w-full mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
      <div className="max-w-lg mx-auto w-full">
        <h2 className="sr-only">Order summary</h2>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {Array.isArray(cartItems) && cartItems.length === 0 ? (
              <h1 className="text-3xl py-5">NO ITEM. ADD ITEMS</h1>
            ) : (cartItems?.map((item, idx) => (
                <li key={idx} className="py-6 flex space-x-6">
                  <img
                    src={item.image}
                    alt=""
                    className="flex-none w-24 h-24 object-center object-cover bg-gray-100 rounded-md"
                  />
                  <div className="flex-auto">
                    <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                      <div className="flex-auto text-sm font-medium space-y-1">
                        <h3 className="text-gray-900">{item.name}</h3>
                        <p className="text-gray-900">Price: ${item.price}</p>
                        <p
                          className={`${
                            item.size === null ? "hidden" : " text-gray-500"
                          }`}
                        >
                          Size: {item.size}
                        </p>
                        <p className=" text-gray-500 ">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex-none flex space-x-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() =>
                            increaseQuantity(item.productId, item.size)
                          }
                        >
                          Increase
                        </button>
                        <div className="flex border-l border-gray-300 pl-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() =>
                              removeFromCart(item.productId, item.size)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
          <div className="flex justify-between border-t border-gray-200 text-gray-900 pt-6">
            <dt className="text-base">Total</dt>
            <dd className="text-base">${calculateTotal()}</dd>
          </div>
        </dl>
        <div className="w-full pt-5">
          {userID ? (
            <button className="bg-black w-full rounded-md py-3 text-white text-lg">
              <Link to="/cart/checkout" onClick={close_Cart}>
                Checkout
              </Link>
            </button>
          ) : (
            <button className="bg-black w-full rounded-md py-3 text-white text-lg">
              <Link to="/Login">Log in to continue</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

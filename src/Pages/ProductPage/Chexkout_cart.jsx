import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../../components/config/StateProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function CheckOut_cart() {
    const [cartItems, setCartItems] = useState(null);
    const [userinfo, setUserinfo] = useState(null);
    const {setCartupdate} = useGlobalContext()
    const userID = localStorage.getItem("userID");
   
    const fetch_user = async () => {
        if(!userID)return;
        try {
            const response = await axios.get(`https://ecommerce-backend-kl4l.onrender.com/auth/user/${userID}`);
            setUserinfo(response.data.user_info);
             localStorage.setItem("user", response.data.user_info.cart.length);
            setCartItems(response.data.user_info.cart || []); // Ensure cart is set even if empty
        } catch (error) {
            console.log(error);  
        }
    };

    useEffect(() => {
        fetch_user();
    }, []);

    // Function to update localStorage and state
    const updateCart = async (userId, newCart) => {
        // Assuming setCartItems updates the state in your React component
        setCartItems(newCart);
    };

    const removeFromCart = async ( productId, size) => {
        try {
            const response = await fetch(`https://ecommerce-backend-kl4l.onrender.com/product/v1/Remove`, {
                method : "DELETE",
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
                
              let count =  localStorage.getItem("user")
              if (count !== null) {
                count = count --;
                setCartupdate(count)
                console.log(count);
              }
                // Update local cart state
                const newCart = cartItems.filter(item => item.productId !== productId || item.size !== size);
                updateCart(userID, newCart);
                window.location.reload()
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                if (message.includes("User or Product not found")) {
                  toast.error("User or Product not found");
                } else if (message.includes("Item not found in cart")) {
                  toast.error("Item not found in cart");
                } else if(message.includes("Failed to remove from cart")) {
                  toast.error("Failed to remove from cart");
                }else if (message.includes("Failed to increase quantity")) {
                    toast.error("Failed to increase quantity")
                } else {
                  toast.error("Error: " + errorMessage);
                }
              }
        }
    };

    setCartupdate(cartItems?.length);


    const increaseQuantity = async ( productId, size) => {
        console.log(productId);
        try {
            const response = await axios.put(`https://ecommerce-backend-kl4l.onrender.com/product/v1/Increase`, {
                productId,
                size,
                userId:userID
            });
    
            if (response.status === 200) {
                toast.success("Increased quantity successfully");
                // Update local cart state
                const newCart = cartItems.map(item => {
                    if (item.productId === productId && item.size === size) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                updateCart(userID, newCart);
                window.location.reload()
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                if (message.includes("User or Product not found")) {
                  toast.error("User or Product not found");
                } else if (message.includes("Item not found in cart")) {
                  toast.error("Item not found in cart");
                } else if(message.includes("Product is out of stock.")) {
                  toast.error("Product is out of stock.");
                }else {
                  toast.error("Error: " + errorMessage);
                }
              }
        }
    };
    // Calculate total amount
    
    // Checkout function
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

    useEffect(() => {
       
    }, [userinfo]);

    useEffect(() => {
    }, [cartItems]);


    return (
        <div className="w-full mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
            <div className="max-w-lg mx-auto w-full">
                <h2 className="sr-only">Order summary</h2>

                <div className="flow-root ">
                    <ul role="list" className="-my-6 divide-y h-full divide-gray-200">
                        {cartItems && cartItems.length === 0 ? (
                            <div className='w-full h-full flex justify-center items-center'>

                                <h1 className='text-xl py-5 text-red-500'>No item here, please add some..</h1>
                            </div>
                        ) : (
                            cartItems && cartItems.map((item, idx) => (
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
                                                {/* <p className="text-gray-900">Price: ${item.stock}</p> */}
                                                <p className={`${item.size === null ? "hidden": " text-gray-500"}`}>Size: {item.size}</p>
                                                <p className=" text-gray-500 ">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="flex-none flex space-x-4">
                                                <button
                                                    type="button"
                                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() => increaseQuantity(item.productId, item.size)}
                                                >
                                                    Increase
                                                </button>
                                                <div className="flex border-l border-gray-300 pl-4">
                                                    <button
                                                        type="button"
                                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => removeFromCart(item.productId, item.size)}
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
            </div>

        </div>
    );
}

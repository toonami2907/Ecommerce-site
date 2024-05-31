import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    // Function to fetch cart items from localStorage
    const fetchCartItems = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]").map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCartItems(cart);
    };

    // Function to update localStorage and state
    const updateCart = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    // Remove item from cart
    const removeFromCart = (index) => {
        const newCart = cartItems.filter((_, idx) => idx !== index);
        updateCart(newCart);
    };

    // Increase item quantity in cart
    const increaseQuantity = (index) => {
        const newCart = cartItems.map((item, idx) => {
            if (idx === index) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        updateCart(newCart);
    };

    // Calculate total amount
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };
const CheckOut =()=>{
    const avaliableMoney = 100
    if (avaliableMoney < calculateTotal()) {
         toast.error("no money available")    
    }
    else if(cartItems.length === 0){
        return toast.error("Please add item")
    }
    else{
        toast.success("purchased Successfully")
    }
}
    // Fetch cart items when the component mounts
    useEffect(() => {
        fetchCartItems();
        // Add event listener for storage changes
        const handleStorageChange = (event) => {
            if (event.key === 'cart') {
                fetchCartItems();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="w-full mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
                <div className="max-w-lg mx-auto w-full">
                    <h2 className="sr-only">Order summary</h2>

                    <div className="flow-root ">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.length === 0 ? (
                                <h1 className='text-3xl py-5'>NO ITEM. ADD ITEMS</h1>
                            ) : (
                                cartItems.map((item, idx) => (
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
                                                    <p className="hidden text-gray-500 sm:block">Size: {item.size}</p>
                                                    <p className="hidden text-gray-500 sm:block">Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="flex-none flex space-x-4">
                                                    <button
                                                        type="button"
                                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => increaseQuantity(idx)}
                                                    >
                                                        Increase
                                                    </button>
                                                    <div className="flex border-l border-gray-300 pl-4">
                                                        <button
                                                            type="button"
                                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => removeFromCart(idx)}
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
                            <dd className="text-base">${calculateTotal().toFixed(2)}</dd>
                        </div>
                    </dl>
                    <div className='w-full pt-5'>
                    <button onClick={CheckOut} className='bg-black w-full rounded-md py-3 text-white text-lg '>Checkout</button>
                    </div>
                </div>

        </div>
    );
}

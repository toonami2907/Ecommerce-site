import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Star, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../../components/config/StateProvider';
import Choose_Recommeded from '../../Sections/Choose_Recommeded';
import Accordion from './Accordion';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Product_color from './Product_color';

export default function Product_Details() {
    const { userID } = useGlobalContext();
    const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    const [size, setSize] = useState(null); // Initially set to null

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "https://ecommerce-backend-kl4l.onrender.com/product/v1/products",
                { withCredentials: true } // Ensure cookies are sent with the request
            );
            setItem(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        // Add any required functionality when cookies change, if needed
    }, [cookie]);

    let ItemID = item.find(item => item._id === id);

    const handleCart = async (ItemID) => {
        if (size === null && ItemID.category === "shoes") {
            return toast.error("Size can't be empty.");
        }
        if (!userID) {
            return toast.error("Please Sign Up / Sign In to continue");
        }

        try {
            const response = await axios.post('https://ecommerce-backend-kl4l.onrender.com/product/v1/cart', {
                userId: userID,
                productId: ItemID._id,
                size,
            });

            if (response.status === 201) {
                toast.success("Added to cart successfully");
                setSize(null); // Reset size
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                console.error(error);
                toast.error("Failed to add to cart");
            }
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                if (message.includes("Invalid token")) {
                    toast.error("Please Login Again, Session expired already....");
                    navigate("/login");
                } else {
                    toast.error("Error: " + error);
                }
            }
        }
    };

    const handleSize = (size) => {
        setSize(size);
    };

    return (
        <div>
            <section className='h-screen'>
                <section className='lg:grid lg:grid-cols-2 w-[90%] mx-auto flex flex-col lg:gap-5 lg:pt-5'>
                    {/* PRODUCT IMAGE */}
                    <div className='h-full justify-between items-center flex'>
                        <div className="rounded-lg overflow-hidden px-5">
                            {ItemID ? (
                                <img src={ItemID.image} alt={ItemID.name} className='h-full lg:h-full lg:w-full md:w-[600px] md:h-[400px] w-full object-center rounded-lg object-cover' />
                            ) : (
                                <div className='md:h-[400px] md:w-[600px] w-[400px] h-[200px] bg-gray-300 animate-pulse rounded-lg'></div>
                            )}
                        </div>
                    </div>
                    {/* PRODUCT INFO */}
                    <div className='lg:max-h-[600px] overflow-y-auto py-10 px-5'>
                        <h1 className='text-4xl font-["SpaceGrotesk-bold"]'>
                            {ItemID ? ItemID.name : <div className='w-[400px] h-[40px] bg-gray-300 animate-pulse'></div>}
                        </h1>
                        {/* PRODUCT RATING */}
                        <div className='flex gap-3 py-2 lg:flex-row flex-col items-start lg:items-center'>
                            <p className='text-2xl lg:py-2'>
                                {ItemID ? `$${ItemID.price}` : <span className='w-[50px] h-[30px] bg-gray-300 animate-pulse'></span>}
                            </p>
                            <div className='flex gap-2 lg:py-5'>
                                <div className='border-l lg:flex hidden border-gray-500' />
                                {ItemID ? (
                                    <>
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} size={18} fill='gold' color='gold' />
                                        ))}
                                        <Star fill='lightgray' size={18} color='lightgray' />
                                        <p className='text-sm text-gray-600'>190 reviews</p>
                                    </>
                                ) : (
                                    <div className='flex gap-2'>
                                        {[...Array(5)].map((_, index) => (
                                            <div key={index} className='w-[18px] h-[18px] bg-gray-300 animate-pulse'></div>
                                        ))}
                                        <div className='w-[50px] h-[18px] bg-gray-300 animate-pulse'></div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className='text-gray-700 py-4 lg:pb-5'>
                            {ItemID ? ItemID.description : (
                                <span className='w-full h-[80px] bg-gray-300 animate-pulse'></span>
                            )}
                        </p>
                        {/* ACCORDION SECTION */}
                        <div className='mb-4'>
                            <Accordion />
                        </div>
                        <div className='flex items-center gap-3'>
                            {ItemID ? (
                                <>
                                    {ItemID.stock === 0 ? <X color='red' /> : <Check color='green' />}
                                    <p className={`${ItemID.stock === 0 ? "text-red-800" : "text-gray-700"}`}>
                                        {ItemID.stock === 0 ? "Out of stock for now" : "In stock and ready for sale"}
                                    </p>
                                </>
                            ) : (
                                <div className='w-[200px] h-[20px] bg-gray-300 animate-pulse'></div>
                            )}
                        </div>
                        {/* Product color */}
                        <div className='py-5'>
                            <Product_color />
                        </div>
                        {/* PRODUCT SIZE */}
                        {ItemID && ItemID.category === 'shoes' && (
                            <>
                                <h1 className='text-lg pt-2 text-gray-600'>Available size</h1>
                                <div className='flex py-2 gap-5'>
                                    {ItemID.size.map(sizeValue => (
                                        <button
                                            key={sizeValue}
                                            value={sizeValue}
                                            onClick={() => handleSize(sizeValue)}
                                            className={`${sizeValue === 0 ? "hidden" : "py-3 px-4"} rounded-md ${size === sizeValue ? "bg-gray-800 text-white" : "bg-gray-200 text-black "}`}>
                                            {sizeValue !== 0 && sizeValue}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        {/* ADD TO CART BUTTON */}
                        {ItemID ? (
                            <button
                                onClick={() => handleCart(ItemID)}
                                className='py-3 bg-black w-full mb-4 rounded-md hover:bg-black/80 text-white text-lg'>
                                Add to cart
                            </button>
                        ) : (
                            <div className='w-full h-[50px] bg-gray-300 animate-pulse rounded-md my-5'></div>
                        )}
                        <Accordion />
                    </div>
                </section>
                <Choose_Recommeded />
            </section>
        </div>
    );
}

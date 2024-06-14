import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Star, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../../components/config/StateProvider';
import Choose_Recommeded from '../../Sections/Choose_Recommeded';
import Accordion from './Accordion';
import { useCookies } from 'react-cookie';
import Product_color from './Product_color';

export default function Product_Details() {
    const { userID } = useGlobalContext();
    const [cookies] = useCookies(["access_token"]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    const [size, setSize] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://ecommerce-backend-kl4l.onrender.com/product/v1/products", {
                withCredentials: true
            });
            setItem(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const currentItem = item.find(product => product._id === id);

    const handleCart = async (item) => {
        if (!size && item.category === "shoes") {
            return toast.error("Size can't be empty.");
        }
        if (!userID) {
            return toast.error("Please Sign Up / Sign In to continue");
        }

        try {
            const response = await axios.post('https://ecommerce-backend-kl4l.onrender.com/product/v1/cart', {
                userId: userID,
                productId: item._id,
                size,
            });

            if (response.status === 201) {
                toast.success("Added to cart successfully");
                setSize(null);
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    toast.error(data.message);
                } else if (data.message.includes("Invalid token")) {
                    toast.error("Session expired. Please log in again.");
                    navigate("/login");
                } else {
                    toast.error("Failed to add to cart.");
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
            console.error("Error adding to cart:", error);
        }
    };

    const handleSize = (selectedSize) => {
        setSize(selectedSize);
    };

    return (
        <div>
            <section className="h-screen">
                <section className="lg:grid lg:grid-cols-2 w-[90%] mx-auto flex flex-col lg:gap-5 lg:pt-5">
                    {/* PRODUCT IMAGE */}
                    <div className="h-full flex justify-between items-center">
                        <div className="rounded-lg overflow-hidden px-5">
                            {currentItem ? (
                                <img src={currentItem.image} alt={currentItem.name} className="h-full lg:h-full lg:w-full md:w-[600px] md:h-[400px] w-full object-center rounded-lg object-cover" />
                            ) : (
                                <div className="md:h-[400px] md:w-[600px] w-[400px] h-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
                            )}
                        </div>
                    </div>
                    {/* PRODUCT INFO */}
                    <div className="lg:max-h-[600px] overflow-y-auto py-10 px-5">
                        <h1 className="text-4xl font-['SpaceGrotesk-bold']">
                            {currentItem ? currentItem.name : <div className="w-[400px] h-[40px] bg-gray-300 animate-pulse"></div>}
                        </h1>
                        {/* PRODUCT RATING */}
                        <div className="flex gap-3 py-2 lg:flex-row flex-col items-start lg:items-center">
                            <p className="text-2xl lg:py-2">
                                {currentItem ? `$${currentItem.price}` : <span className="w-[50px] h-[30px] bg-gray-300 animate-pulse"></span>}
                            </p>
                            <div className="flex gap-2 lg:py-5">
                                <div className="border-l lg:flex hidden border-gray-500" />
                                {currentItem ? (
                                    <>
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} size={18} fill="gold" color="gold" />
                                        ))}
                                        <Star fill="lightgray" size={18} color="lightgray" />
                                        <p className="text-sm text-gray-600">190 reviews</p>
                                    </>
                                ) : (
                                    <div className="flex gap-2">
                                        {[...Array(5)].map((_, index) => (
                                            <div key={index} className="w-[18px] h-[18px] bg-gray-300 animate-pulse"></div>
                                        ))}
                                        <div className="w-[50px] h-[18px] bg-gray-300 animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-700 py-4 lg:pb-5">
                            {currentItem ? currentItem.description : (
                                <span className="w-full h-[80px] bg-gray-300 animate-pulse"></span>
                            )}
                        </p>
                        {/* ACCORDION SECTION */}
                        <div className="mb-4">
                            <Accordion />
                        </div>
                        <div className="flex items-center gap-3">
                            {currentItem ? (
                                <>
                                    {currentItem.stock === 0 ? <X color="red" /> : <Check color="green" />}
                                    <p className={`${currentItem.stock === 0 ? "text-red-800" : "text-gray-700"}`}>
                                        {currentItem.stock === 0 ? "Out of stock for now" : "In stock and ready for sale"}
                                    </p>
                                </>
                            ) : (
                                <div className="w-[200px] h-[20px] bg-gray-300 animate-pulse"></div>
                            )}
                        </div>
                        {/* PRODUCT COLOR */}
                        <div className="py-5">
                            <Product_color />
                        </div>
                        {/* PRODUCT SIZE */}
                        {currentItem && currentItem.category === 'shoes' && (
                            <>
                                <h1 className="text-lg pt-2 text-gray-600">Available size</h1>
                                <div className="flex py-2 gap-5">
                                    {currentItem.size.map(sizeValue => (
                                        <button
                                            key={sizeValue}
                                            value={sizeValue}
                                            onClick={() => handleSize(sizeValue)}
                                            className={`${sizeValue === 0 ? "hidden" : "py-3 px-4"} rounded-md ${size === sizeValue ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
                                            {sizeValue !== 0 && sizeValue}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        {/* ADD TO CART BUTTON */}
                        {currentItem ? (
                            <button
                                onClick={() => handleCart(currentItem)}
                                className="py-3 bg-black w-full mb-4 rounded-md hover:bg-black/80 text-white text-lg">
                                Add to cart
                            </button>
                        ) : (
                            <div className="w-full h-[50px] bg-gray-300 animate-pulse rounded-md my-5"></div>
                        )}
                        <Accordion />
                    </div>
                </section>
                <Choose_Recommeded />
            </section>
        </div>
    );
}

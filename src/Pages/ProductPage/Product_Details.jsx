import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductData } from './ProductCard'; // Ensure this path is correct

export default function Product_Details() {
    const { id } = useParams();
    const [item] = useState(ProductData);
    const [size, setSize] = useState(null); // Initially set to null
    const ItemID = item.find(item => item.name === id);

    const handleCart = () => {
        if (size === null) {
            return toast.error("Size can't be empty.");
        }
        const cartItem = {
            productId: ItemID.name,
            price: ItemID.price,
            image: ItemID.imgURL,
            size,
        };

        try {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const itemExists = cart.some(item => item.productId === ItemID.name && item.size === size);

            if (itemExists) {
                return toast.error("This item is already in the cart.");
            }

            cart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            toast.success("Added to cart successfully");
            setSize(null); // Reset size
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to cart");
        }
    };

    const handle_size = (size) => {
        setSize(size);
    };

    let count = 4;
    const stars = Array.from({ length: count }, (_, index) => index + 1);

    return (
        <div>
            <section className='h-screen'>
                <section className='lg:grid lg:grid-cols-2 w-[90%] mx-auto flex flex-col lg:gap-5 lg:pt-5'>
                    {/* PRODUCT IMAGE */}
                    <div className='h-full justify-between flex'>
                        <div className="rounded-lg overflow-hidden px-5">
                            <img src={ItemID && ItemID.imgURL} alt="" className='h-full w-full object-center rounded-lg object-cover' />
                        </div>
                    </div>
                    {/* PRODUCT INFO */}
                    <div className='max-h-full overflow-y-auto py-10 px-5'>
                        <h1 className='text-4xl font-["SpaceGrotesk-bold"]'>{ItemID.name}</h1>
                        {/* PRODUCT RATING */}
                        <div className='flex gap-3 py-2 lg:flex-row flex-col items-start lg:items-center'>
                            <p className='text-2xl lg:py-2'>${ItemID.price}</p>
                            <div className='flex gap-2 lg:py-5'>
                                <div className='border-l lg:flex hidden border-gray-500' />
                                {stars.map((_, index) => (
                                    <Star key={index} size={18} fill='gold' color='gold' />
                                ))}
                                <Star fill='lightgray' size={18} color='lightgray' />
                                <p className='text-sm text-gray-600'>190 reviews</p>
                            </div>
                        </div>
                        <p className='text-gray-700 py-4 lg:pb-5'>{ItemID.descript} Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.</p>
                        <div className='flex items-center gap-3'>
                            <Check color='green' />
                            <p className='text-gray-700'>In stock and ready to sale</p>
                        </div>
                        {/* PRODUCT SIZE */}
                        <div className='flex py-2 gap-5'>
                            {[39, 40, 42].map(sizeValue => (
                                <button
                                    key={sizeValue}
                                    value={sizeValue}
                                    onClick={() => handle_size(sizeValue)}
                                    className={`py-3 px-4 rounded-md text-white ${size === sizeValue ? "bg-red-400" : "bg-black"}`}>
                                    {sizeValue}
                                </button>
                            ))}
                        </div>
                        {/* ADD TO CART BUTTON */}
                        <button
                            onClick={handleCart}
                            className='py-3 bg-black w-full rounded-md hover:bg-black/80 text-white text-lg'>Add to cart</button>
                    </div>
                </section>
            </section>
        </div>
    );
}

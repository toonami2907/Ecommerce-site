import React from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../components/config/StateProvider';

export default function Add_to_cart() {
    const { userID } = useGlobalContext()
    const handleCart = async (ItemID, size) => {
        if (size === null) {
            return toast.error("Size can't be empty.");
        }
    
        try {
            const response = await axios.post('http://localhost:5000/cart', {
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
        }
    };
  return (
    <div>add_to_cart</div>
  )
}
        // if (size === null) {
        //     return toast.error("Size can't be empty.");
        // }
        // const cartItem = {
        //     productId: ItemID._id,
        //     price: ItemID.price,
        //     image: ItemID.image,
        //     size,
        // };

        // try {
        //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
        //     const itemExists = cart.some(item => item.productId === ItemID._id && item.size === size);

        //     if (itemExists) {
        //         return toast.error("This item is already in the cart.");
        //     }

        //     cart.push(cartItem);
        //     localStorage.setItem("cart", JSON.stringify(cart));
        //     toast.success("Added to cart successfully");
        //     setSize(null); // Reset size
        //     window.location.reload();
        // } catch (error) {
        //     console.error(error);
        //     toast.error("Failed to add to cart");
        // }
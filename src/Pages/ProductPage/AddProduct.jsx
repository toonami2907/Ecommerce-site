import { CloudUploadIcon, DollarSign, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { convertToBase64 } from '../../components/config/libconfig';



export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [s1, setS1] = useState(0);
    const [s2, setS2] = useState(0);
    const [stock, setStock]= useState(0)
    const [brand, setBrand]= useState("")

    let size = [s1, s2];
    let convertprice = Number(price)
    let convertStock = parseInt(stock)
  
    const handleImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);
    };

    const token = localStorage.getItem('token');

    const categories = ["shoes", "Tops & T-shirts", "Short", "Jeans", "Hoodies", "Accessories", "Socks", "Pants & Tights"];

    const UploadProduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !stock || !image || !brand || !size || !description){
            return toast.error("All field are required")
        }
        try {
            const response = await axios.post("http://localhost:8080/product/v1/create", {
                name,
                price:convertprice,
                description,
                image,
                size,
                brand,
                category,
                stock:convertStock
            },{
                headers: {
                  'Authorization': `Bearer ${token}`, // Include the JWT token if required for authentication
                  'Content-Type': 'application/json', // Set the content type based on your backend expectations
                  // Add any other headers if needed
                }
              });
            toast.success("Uploaded successfully");
            setBrand === "";
            setCategory ==="";
            setImage === "";
            setPrice ===0;
            setStock === 0;
            setS1 === "";
            setS2 ===""
        } catch (error) {
            if (error.response) {
                // Server responded with a status code outside the range of 2xx
                const errorMessage = error.response.data.message;
                if (errorMessage.includes("Product required info can't be empty")) {
                  toast.error("Product required info can't be empty");
                } else if (errorMessage.includes("Price must be a positive number")) {
                  toast.error("Price must be a positive number");
                } else if( errorMessage ==="Stock must be a non-negative integer") {
                  toast.error("Stock must be a non-negative integer");
                }else if( errorMessage.includes("Product already exists in the database")){
                  toast.error("Product already exists in the database");
                }
              } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response received from the server");
              } else {
                // Something happened in setting up the request that triggered an error
                toast.error("Error sending request to the server");
              }
        }
    };

    return (
        <div>
            <section className='h-full w-full lg:px-10 px-5 '>
                <div className='w-full flex md:flex-row flex-col justify-between lg:items-center'>
                    <h1 className='lg:text-2xl text-lg font-semibold'>Add Product</h1>
                    <div>
                        <button
                            onClick={UploadProduct}
                            className='flex gap-3 items-center px-5 py-2 rounded-md bg-blue-700 text-white'>
                            <CloudUploadIcon /> Upload Product
                        </button>
                    </div>
                </div>
                <section className='grid lg:grid-cols-2 gap-5 py-5 h-full'>
                    <div className='bg-gray-50 h-[400px] rounded-2xl py-5 px-5'>
                        <h1 className='text-xl font-semibold'>Basic Information</h1>
                        <form className='flex gap-5 flex-col h-full py-3 '>
                            <div className='flex   flex-col'>
                            <label htmlFor="name" className='text-lg'>Product name</label>
                            <input
                                type="text"
                                id='name'
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Product name'
                                className='lg:w-[70%] w-full md:w-[80%] h-10 rounded-md outline-none px-2 bg-gray-200 border-gray-300' />

                            </div>
                            <div className='flex relative  flex-col'>
                            <label htmlFor="price">Price $</label>
                            <input
                                type="number"
                                value={price}
                                required
                                id='price'
                                onChange={(e) =>{ 
                                let check = e.target.value
                                if(check < 0){
                                    return
                                }
                                setPrice(check)}}
                                placeholder='Product price'
                                className='lg:w-[50%] w-full md:w-[70%] h-10 rounded-md outline-none pl-8 pr-2 bg-gray-200 border-gray-300' />
                                <span className='absolute top-8 pl-1'><DollarSign/></span>
                            </div>
                            <textarea
                                required
                                name="" id=""
                                placeholder='Product description here'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="description bg-gray-200 sec h-52 border py-4 px-2 border-gray-300 rounded-md outline-none">
                            </textarea>
                        </form>
                    </div>
                    <div className='rounded-2xl'>
                        <section className='grid grid-cols-1 gap-3 h-full'>
                            {/* Product image */}
                            <div className="bg-gray-50 rounded-md py-5 px-5">
                                <h1 className="text-xl font-semibold">Product's Image</h1>
                                <form action="" className='h-full'>
                                    <div className="flex flex-col items-center gap-1 justify-center h-[90%]">
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer flex flex-col items-center bg-white text-blue-500 rounded-lg border border-blue-500 h-[60%] w-[60%] justify-center hover:bg-blue-500 hover:text-white transition-colors"
                                        >
                                            <UploadCloud className="w-6 h-6" />
                                            <span>Upload a file</span>
                                            <input
                                                required
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                accept='.jpeg, .png, .jpg, .webp'
                                                onChange={handleImage}
                                            />
                                        </label>
                                        {image && <p>Image Selected</p>}
                                    </div>
                                </form>
                            </div>
                            {/* Category section */}
                            <div className='bg-gray-50 flex flex-col rounded-md py-5 px-5'>
                                <h1 className='text-xl font-semibold'>Category</h1>
                                <div className='h-[70%] py-2 justify-center gap-2 flex flex-col'>
                                    <p>Product Category</p>
                                    <select
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className='h-10 lg:w-[50%] w-full md:w-[70%] border border-gray-300 rounded-2xl outline-none px-3'
                                    >
                                        <option value="" disabled className='pr-5'>Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* unknown card */}
                    <div className='bg-gray-50 rounded-2xl px-5'>
                        <h1 className='text-xl'>Available Product Sizes</h1>
                        <form action="" className='py-5 '>
                            <div className='flex gap-5'>
                                <input
                                    type="number"
                                    required
                                    value={s1}
                                    onChange={(e) => {
                                        let check = e.target.value
                                        if (check < 0||  check.length > 2 || check >45) {
                                            return
                                        }
                                        setS1(check)}}
                                    placeholder='Size 1'
                                    className='w-20 h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300' />
                                <input
                                    type="number"
                                    required
                                    value={s2}
                                    onChange={(e) => {
                                        let check = e.target.value
                                        if (check < 0|| check.length > 2 ||  check >45) {
                                            return
                                        }
                                        setS2(check)}}
                                    placeholder='Size 2'
                                    className='w-20 h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300' />
                            </div>
                        </form>
                    </div>
                    <div className='bg-gray-50 flex rounded-2xl px-5 gap-4'>
                        <div>
                        <h1 className='text-xl'>Stock</h1>
                        <form action="" className='py-5 '>
                            <div className='flex gap-5'>
                                <input
                                    required
                                    type="number"
                                    value={stock}
                                    onChange={(e) => {
                                        let check = e.target.value
                                        if (check < 0) {
                                            return
                                        }
                                        setStock(check)}}
                                    placeholder='Stock '
                                    className='w-20 h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300' />
                                
                                
                            </div>
                        </form>
                        </div>
                        <div>
                        <h1 className='text-xl'>Brand</h1>
                        <form action="" className='py-5 '>
                            <div className='flex gap-5'>
                                <input
                                    required
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    placeholder='nike '
                                    className='w-[150px] h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300' />
                                
                                
                            </div>
                        </form>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}

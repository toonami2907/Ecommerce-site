import { CloudUploadIcon, DollarSign, UploadCloud } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { convertToBase64 } from '../../components/config/libconfig';
import { getDownloadURL, uploadBytes,ref } from 'firebase/storage';
import { storage } from '../../Firebase/firebase';

export default function Update_product({ id}) {
    const [name, setName] = useState( "");
    const [price, setPrice] = useState( 0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState( "");
    const [s1, setS1] = useState( 0);
    const [s2, setS2] = useState( 0);
    const [sex, setSex] = useState( "");
    const [stock, setStock] = useState( 0);
    const [brand, setBrand] = useState("");
    const [hide, setHide] = useState(false);
    const [disable, setDisable] = useState(false);

    let size = [s1, s2];
    let convertprice = Number(price);
    let convertStock = parseInt(stock);

    const token = localStorage.getItem('token');

    const handle_off = () => {
        setHide(!hide);
        setDisable(!disable);
    };

    const categories = ["shoes", "Tops & T-shirts", "Short", "Furnitures", "Hoodies", "Accessories", "Socks", "Pants & Tights"];
    const Sex = ["male", "female"];

    const uploadFile = async (image) => {
        if (!image) return;

        try {
            const imageRef = ref(storage, `images/${image.name}`);
            const snapshot = await uploadBytes(imageRef, image);
            const url = await getDownloadURL(snapshot.ref);

            toast.success("Uploaded to Firebase successfully!");
            setImage(url);
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image. Please try again.");
            return null;
        }
    };


    const UploadProduct = async (e) => {
        e.preventDefault();

        if (!name || !price || !category || !stock || !sex || !brand || !description) {
            return console.error("All fields are required");
        }
        if( !image || image === ""){
        return console.error("image cant be empty ")
        }


        try {
            const response = await axios.put(`http://localhost:8080/product/v1/update/${id}`, {
                name,
                price: convertprice,
                description,
                image,
                size,
                brand,
                sex,
                category,
                stock: convertStock
            }, { withCredentials: true });

            toast.success("Uploaded successfully");
            setName("");
            setPrice(0);
            setDescription("");
            setImage("");
            setCategory("");
            setS1(0);
            setS2(0);
            setSex("");
            setStock(0);
            setBrand("");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product");
        }
    };

    return (
        <div>
            <section className='h-full w-full lg:px-10 px-5 '>
                <div className='w-full flex md:flex-row flex-col gap-21 justify-between lg:items-center'>
                    <h1 className='lg:text-2xl text-lg font-semibold'>Update Product</h1>
                    <button className='w-[200px] rounded-md shadow-md my-2 py-2 bg-green-700' onClick={handle_off}>
                        <h1 className='text-white'>{hide ? "Remove Size" : "Add Size"}</h1>
                    </button>

                    <div>
                        <button onClick={UploadProduct} className='flex gap-3 items-center px-5 py-2 rounded-md bg-green-700 text-white'>
                            <CloudUploadIcon /> Update Product
                        </button>
                    </div>
                </div>

                <section className='grid lg:grid-cols-2 gap-5 py-5 h-full'>
                    <div className='bg-gray-50 h-[400px] rounded-2xl py-5 px-5'>
                        <h1 className='text-xl font-semibold'>Basic Information</h1>
                        <form className='flex gap-5 flex-col h-full py-3 '>
                            <div className='flex flex-col'>
                                <label htmlFor="name" className='text-lg'>Product name</label>
                                <input
                                    type="text"
                                    id='name'
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Product name'
                                    className='lg:w-[70%] w-full md:w-[80%] h-10 rounded-md outline-none px-2 bg-gray-200 border-gray-300'
                                />
                            </div>

                            <div className='flex relative flex-col'>
                                <label htmlFor="price">Price $</label>
                                <input
                                    type="number"
                                    value={price}
                                    required
                                    id='price'
                                    onChange={(e) => {
                                        let check = e.target.value;
                                        if (check < 0) return;
                                        setPrice(check);
                                    }}
                                    placeholder='Product price'
                                    className='lg:w-[50%] w-full md:w-[70%] h-10 rounded-md outline-none pl-8 pr-2 bg-gray-200 border-gray-300'
                                />
                                <span className='absolute top-8 pl-1'><DollarSign /></span>
                            </div>

                            <textarea
                                required
                                placeholder='Product description here'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="description bg-gray-200 sec h-52 border py-4 px-2 border-gray-300 rounded-md outline-none"
                            />
                        </form>
                    </div>

                    <div className='rounded-2xl'>
                        <section className='grid grid-cols-1 gap-3 h-full'>
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
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                accept='.jpeg, .png, .jpg, .webp'
                                                onChange={(event) => {
                                                    const file = event.target.files[0];
                                                    uploadFile(file);
                                                }}
                                            />
                                        </label>
                                        <p className={`${image ? "text-green-500" : "text-red-500"}`}>{image ? "Image selected" : "Please input an image"}</p>
                                    </div>
                                </form>
                            </div>

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

                    <div className={`${disable ? "hidden" : "bg-gray-50 rounded-2xl px-5"}`}>
                        <h1 className='text-xl'>Available Product Sizes</h1>
                        <form action="" className={`${disable ? "hidden" : "flex"}`}>
                            <div className='flex gap-5'>
                                <input
                                    disabled={disable}
                                    type="number"
                                    value={s1}
                                    onChange={(e) => {
                                        let check = e.target.value;
                                        if (check < 0 || check.length > 2 || check > 45) return;
                                        setS1(check);
                                    }}
                                    placeholder='Size 1'
                                    className='w-20 h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300'
                                />
                                <input
                                    type="number"
                                    disabled={disable}
                                    value={s2}
                                    onChange={(e) => {
                                        let check = e.target.value;
                                        if (check < 0 || check.length > 2 || check > 45) return;
                                        setS2(check);
                                    }}
                                    placeholder='Size 2'
                                    className='w-20 h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300'
                                />
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
                                            let check = e.target.value;
                                            if (check < 0) return;
                                            setStock(check);
                                        }}
                                        placeholder='Stock '
                                        className='w-20 h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300'
                                    />
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
                                        className='w-[150px] h-10 rounded-md outline-none px-2 bg-gray-300 border-gray-300'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='bg-gray-50 flex flex-col py-5 rounded-2xl px-5'>
                        <h1 className='text-xl'>Sex</h1>
                        <p className='text-sm text-gray-600'>Select sex for the product [male, female]</p>
                        <form action="" className='py-3 w-full'>
                            <div className='flex gap-5'>
                                <select
                                    required
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                    className='h-10 lg:w-[50%] w-full md:w-[70%] border border-gray-300 rounded-2xl outline-none px-3'
                                >
                                    <option value="" disabled className='pr-5'>Select a sex</option>
                                    {Sex.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    );
}

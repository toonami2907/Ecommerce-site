import React from 'react'
import { useGlobalContext } from '../components/config/StateProvider'
import { Link } from 'react-router-dom'

export default function Product_section() {
    const { product } = useGlobalContext()
    let product_slice = product?.slice(0, 3)
    return (
        <div className='px-5'>
            <h1 className='text-2xl lg:text-3xl pb-3 font-semibold'>Shop Out Now !!</h1>
            <section className='grid lg:grid-cols-4 gap-3  md:grid-cols-3 grid-cols-1'>
                {product && product.map((item, idx) => (
                    <Link key={idx} to={`/about/${item._id}`}>
                        <div className="aspect-h-1 aspect-w-1  overflow-hidden rounded-t-md bg-gray-200  ">
                            <img src={item.image} alt="" className=' object-cover h-[240px] w-full object-center transition duration-1000 transform hover:scale-105' />
                        </div>
                        <div className='text-lg  py-2 space-y-1'>
                            <h1 className='text-lg uppercase font-bold'>{item.name}</h1>
                            <p className='text-red-700 text-sm'>Best selling</p>
                            <div className='bg-gray-500 w-[200px] px-1'>
                                <p className='text-white'>{item.category}</p>
                            </div>
                            <h1 className='font-medium'>${item.price}</h1>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    )
}

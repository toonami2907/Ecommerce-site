import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../components/config/StateProvider';




  

  
  export default function ProductCard() {
    const { filtered } = useGlobalContext()

 
  return (
    <section className='py-2 px-5 max-h-screen overflow-y-auto'>z
    <div className='relative grid grid-cols-2  lg:grid-cols-3 gap-2'>
      {Array.isArray(filtered) && filtered?.map((item, idx) => (
        <Link key={idx} to={`/about/${item._id}`}>
          <div key={idx} className="aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-gray-200  ">
            <img src={item.image} alt="" className=' object-cover object-center transition duration-1000 transform hover:scale-105' />
          </div>
          <div className='text-lg font-semibold py-2 space-y-1'>
            <h1 className='text-sm md:text-lg'>{item.name}</h1>
            <p className='text-red-700 text-sm'>Best selling</p>
            <div className='bg-gray-500 md:w-[150px] lg:w-[200px] px-1'>
              <p className='text-white text-sm lg:text-lg' > {item.category}</p>
            </div>
            {/* <p className='text-gray-700 font-light text-sm md:text-[17px] '>{item.description}</p> */}
            <h1 className='font-medium'>${item.price}</h1>
          </div>
        </Link>
      ))}
     </div>
      </section>



  )
}

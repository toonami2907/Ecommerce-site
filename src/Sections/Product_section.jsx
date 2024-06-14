import React from 'react';
import { useGlobalContext } from '../components/config/StateProvider';
import { Link } from 'react-router-dom';

export default function Product_section() {
  const { product } = useGlobalContext();
  console.log(product);
//   const productSlice = product?.slice(0, 3);

  if (!Array.isArray(product) || product.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className='px-5'>
      <h1 className='text-2xl lg:text-3xl pb-3 font-semibold'>Shop Out Now !!</h1>
      <section className='grid lg:grid-cols-4 gap-3 md:grid-cols-3 grid-cols-1'>
        {Array.isArray(product) && product.map(({ _id, image, name, category, price }, idx) => (
          <Link key={idx} to={`/about/${_id}`}>
            <article className="aspect-h-1 aspect-w-1 overflow-hidden rounded-t-md bg-gray-200">
              <img src={image} alt={name} className='object-cover h-[240px] w-full object-center transition duration-1000 transform hover:scale-105' />
            </article>
            <div className='text-lg py-2 space-y-1'>
              <h1 className='text-lg uppercase font-bold'>{name}</h1>
              <p className='text-red-700 text-sm'>Best selling</p>
              <div className='bg-gray-500 w-[200px] px-1'>
                <p className='text-white'>{category}</p>
              </div>
              <h1 className='font-medium'>${price}</h1>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

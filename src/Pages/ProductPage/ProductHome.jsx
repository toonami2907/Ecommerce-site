import React from 'react';
import { useParams } from 'react-router-dom';
import ToBar from './ToBar';
import ProductSideBar from './ProductSideBar';
import ProductCard from './ProductCard';
import { useGlobalContext } from '../../components/config/StateProvider';

export default function ProductHome() {
  const { hide } = useGlobalContext();
  const { id } = useParams();

  return (
    <div className='flex flex-col z-0 flex-grow w-full'>
      <ToBar id={id} />
      <section className='flex flex-grow w-full relative'>
        <div className={`transition-all duration-500 ease-in-out   ${hide ? 'hidden lg:block lg:w-[0]' : ' lg:w-[25%] '} flex-col max-h-full lg:overflow-y-auto`}>
          <ProductSideBar />
        </div>
        <div className={`transition-all duration-500 ease-in-out ${hide ? 'w-full' : 'lg:w-[75%] w-full'} h-full overflow-y-auto`}>
          <ProductCard />
        </div>
      </section>
    </div>
  );
}

// ToBar.js
import React from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useGlobalContext } from '../../components/config/StateProvider';
import { productCount } from './ProductCard';

export default function ToBar({ id }) {
  const { hide, setHide } = useGlobalContext();

  const handleToggle = () => {
    setHide(!hide);
  };

  return (
    <div className='bg-yellow py-5 px-5 lg:px-10 flex items-center bg-gray-50 justify-between'>
      <h1 className='text-xl font-semibold flex gap-2 items-center'>{id} {`(${productCount})`}</h1>
      <div className="flex gap-10">
        <button onClick={handleToggle} className='lg:flex hidden gap-2 items-center'>
          {hide ? 'Show' : 'Hide'} Filter <SlidersHorizontal size={18} />
        </button>
        <button className='lg:hidden flex gap-2 items-center px-5 bg-gray-100 rounded-full py-2'>
          Filter <SlidersHorizontal size={15} />
        </button>
        <button className='lg:flex hidden gap-1 items-center'>
          Sort By <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBagIcon, User, X } from 'lucide-react';
import Cart from '../Pages/ProductPage/Cart';

const Navigation = [
  { name: 'Trending', to: '#' },
  { name: 'Men ', to: '#' },
  { name: 'Female', to: '#' },
  { name: 'Kids', to: '#' },
  { name: 'Accessories', to: '#' },
];

export const Navbar = () => {
  const [searchbox, setSearchbox] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(false);


  // Function to fetch cart items from localStorage
  const cartnum = JSON.parse(localStorage.getItem("cart"));
  const cartLength = cartnum.length;

  const Clear = () => {
    setSearch("");
  }

  const Getname = (id) => {
    console.log(id);
  }

  const handleInput = () => {
    setSearchbox(true);
  };

  const closeSearchbox = () => {
    setSearchbox(false);
  };

  return (
    <div className='h-full'>
      <nav className='w-full py-4 LinkStyles flex relative items-center px-3 justify-between lg:px-10 bg-white'>
        <Link to='/' className='text-2xl LinkStyles font-bold text-gray-700 lg:w-[10%]'>
          LOGO
        </Link>
        {/* DESKTOP NAVIGATION */}
        <ul className='lg:flex gap-5 lg:w-[30%] hidden '>
          {Navigation.map((navitem, idx) => (
            <li onClick={() => Getname(navitem.name)} key={idx} className='text-lg LinkStyles font-semibold'>
              <Link to={`/product/${navitem.name}`}>{navitem.name}</Link>
            </li>
          ))}
        </ul>
        {/* DESKTOP SEARCH FUNCTIONALITY */}
        <div className='flex items-center justify-between gap-10'>
          <form className='lg:flex transition-all duration-500 ease-in-out relative hidden'>
            <input
              type='text'
              onInput={handleInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
              className='w-48 pl-14 h-12 focus:border-0 outline-none placeholder:text-[18px] pr-4 bg-gray-200 rounded-full'
            />
            <button
              type='button'
              className='absolute top-0 left-0 px-3 h-12 transition-all duration-500 ease-in-out rounded-full hover:bg-gray-300'
            >
              <Search size={25} />
            </button>
          </form>
          <div className='flex gap-5 font-light'>
            <button className='hover:bg-gray-300 px-2 h-10 rounded-full'>
              <Heart />
            </button>
            <button
              onClick={() => setCart(!cart)}
              className='hover:bg-gray-300 relative px-2 h-10 rounded-full'>
              <ShoppingBagIcon />
              <span className='absolute text-xs px-2 py-1 -top-1 rounded-full text-white bg-purple-800 -right-1'>{cartLength}</span>
            </button>
            {/* CART FUNCTIONALITY */}
            <div className={`fixed inset-0 transition-transform transform ${cart ? 'translate-x-0' : 'translate-x-full'} bg-opacity-50 bg-black backdrop-blur-sm z-50`}>
              <div className='absolute top-0 right-0 px-5 w-full md:w-1/2 bg-white h-[100vh] py-10'>
                <h1 className='text-center text-2xl'>Cart</h1>
                <button
                  onClick={() => setCart(!cart)}
                  type='button'
                  className='absolute top-4 right-3 px-2 h-10 rounded-full hover:bg-gray-300'>
                  <X size={25} />
                </button>
              <Cart/> 
              </div>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className='lg:hidden hover:bg-gray-300 px-2 h-10 rounded-full'>
              <Menu />
            </button>
          </div>
        </div>
        {/* MOBILE DEVICE NAVIGATION */}
        <div className={`lg:hidden fixed inset-0 transition-transform transform ${open ? 'translate-x-0' : 'translate-x-full'} bg-opacity-50 bg-black backdrop-blur-sm z-50`}>
          <div className='sm:w-[70%] w-full h-screen absolute px-10 top-0 right-0 bg-white'>
            <button
              onClick={() => setOpen(!open)}
              type='button'
              className='absolute top-4 right-3 px-2 h-10 rounded-full hover:bg-gray-300'>
              <X size={25} />
            </button>
            <ul className='flex flex-col py-16 h-[400px] justify-between'>
              {Navigation.map((nav, idx) => (
                <li key={idx}>
                  <Link to={nav.to} className='text-3xl LinkStyles'>
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='flex gap-5 py-7'>
              <button className='md:px-7 md:py-2 px-4 py-2 bg-black hover:bg-gray-700 rounded-full text-white text-lg'><Link to="/register">Sign up</Link></button>
              <button className='md:px-7 md:py-2 px-4 py-2 border border-gray-600 hover:border-black rounded-full text-lg text-gray-800'><Link to="/Login">Sign in</Link></button>
            </div>
          </div>
        </div>
        {/* SEARCH BOX FUNCTIONALITY */}
        <div className={`fixed inset-0 transition-transform transform ${searchbox ? 'translate-y-0' : 'translate-y-full'} bg-opacity-30 bg-black backdrop-blur-sm z-50`}>
          <div className='h-[400px] bg-gray-50 flex px-5 py-7 overflow-hidden w-full z-50 justify-between'>
            <section className='flex h-0 items-center w-full py-2 justify-between'>
              <h1 className='text-2xl z-50 font-bold text-black'>LOGO</h1>
              <form className='relative'>
                <input
                  type='text'
                  onInput={handleInput}
                  placeholder='Search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-[700px] pl-14 h-12 focus:border-0 outline-none placeholder:text-[18px] pr-4 bg-gray-200 rounded-full'
                />
                <button
                  type='button'
                  className='absolute top-0 left-0 px-3 h-12 rounded-full hover:bg-gray-300'>
                  <Search size={25} />
                </button>
                <button
                  onClick={Clear}
                  type='button'
                  className='absolute top-0 right-0 px-3 h-12 rounded-full hover:bg-gray-300'>
                  <X size={25} />
                </button>
              </form>
              <div className='flex justify-center'>
                <h1 onClick={closeSearchbox} className='font-semibold'>Cancel</h1>
              </div>
            </section>
          </div>
        </div>
      </nav>
    </div>
  );
};

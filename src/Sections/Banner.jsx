import React from 'react'
import slider from 'react-slick'
import Video from '../assets/BackcartVideo.mp4'; 

import './banner.css';
import '../App.css'
export default function Banner() {
  return (
    <div className='banner'>
    <video id='video' src={Video} className='sm:h-[400px]' type="video/mp4" loop muted autoPlay>
      Your browser does not support the video tag.
    </video>
    <div className='overlay'></div>
    <div className='content'>
      <h1 className='lg:text-7xl md:text-6xl sm:text-5xl text-4xl  font-bold leading-[50px] lg:leading-none'>
        SHOPPING TODAY
      </h1>
      <h2 className='md:text-lg text-sm lg:pb-4 lg:text-xl leading-10'>
        We Have Everything You  Need
      </h2>
      <button className='w-[50%] md:w-[30%] lg:w-[20%] mx-auto py-3 hover:bg-gray-200 hover:border hover:border-black hover:text-black rounded-md bg-black text-white'>Shop Now</button>
    </div>
  </div>
  )
}

export const  Navbar2 = ()=>{
    return(
      <>
      <div className='h-10  hidden bg-gray-400 md:flex items-center justify-center'>
          <section className='auto-write  '>
              <span className='md:text-sm lg:text-[20px]'>Hello, Welcome to Logo store</span>
            </section>
      </div>
      <div className='h-10  flex bg-gray-400 md:hidden items-center justify-center'>
          <section className='auto-write-sm '>
              <span className='text-lg'>Hello, Welcome to Logo store</span>
            </section>
      </div>
      </>
    )
} 
import React from 'react'
import Video from '../assets/BackcartVideo.mp4'; 
import './banner.css';
import '../App.css'
export default function Banner() {
  return (
    <div className='banner'>
    <video id='video' src={Video} type="video/mp4" loop muted autoPlay>
      Your browser does not support the video tag.
    </video>
    <div className='overlay'></div>
    <div className='content'>
      <h1>
        SHOPPING TODAY
      </h1>
      <h2>
        We Have Everything YOU Need
      </h2>
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
import React from 'react'
import '../App.css'
export default function Banner() {
  return (
    <div>
    <style>

    </style>
        <section className='h-[400px] bg-green-400'>
            
        </section>
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
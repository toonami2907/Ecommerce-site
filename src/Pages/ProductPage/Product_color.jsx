import React from 'react'

export default function Product_color() {
  return (
    <div className='w-[200px]'>
        <section className='grid grid-cols-4 gap-3'>
            <div className='bg-yellow-400 h-12 w-12 rounded-full border-4 border-gray-200'></div>
            <div className='bg-pink-400 h-12 w-12 rounded-full border-4 border-gray-200'></div>
            <div className='bg-black h-12 w-12 rounded-full border-4 border-gray-200'></div>
            <div className='bg-green-400 h-12 w-12 rounded-full border-4 border-gray-200'></div>
        </section>
    </div>
  )
}

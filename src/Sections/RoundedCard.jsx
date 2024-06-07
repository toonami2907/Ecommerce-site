import React from 'react'


export default function RoundedCard({imgURL, name}) {
  return (
    <div className='w-full flex items-center flex-col justify-center'>
        <section className='h-[200px] w-[200px] flex flex-col items-center justify-center'>
                    <img src={imgURL} alt="" className='h-[150px] w-[150px] border-2 border-gray-300 rounded-full object-cover object-center' /><h1 className='font-bold text-gray-800'>{name}</h1>

        </section>
    </div>
  )
}

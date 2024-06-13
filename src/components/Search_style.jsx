import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Search_style({data, setSearchbox}) {
  function close_input(){
    setSearchbox(false)
  }
  return (
    <div>
        <ul className='w-[90%] mx-auto flex flex-col gap-2'>
            <h1 className='text-center text-xl font-bold '>Total items found : {data.length}</h1>
        {data && data.map((item, idx)=>(
            <li key={idx}  >
                <Link onClick={close_input} key={idx} to={`/about/${item._id}`} className='h-[50px] items-center text-gray-900 rounded-sm px-3 bg-gray-100 w-full flex justify-between'>
                <h1 className='text-[17px] '>{item.name}</h1>
                <p className='text-red-800 font-medium'><span className='span-style'>{(item.stock ===0|| null || undefined) ? " Unavailable" : ""}</span></p>
                <p className='p-style'> Price: <span className='span-style'>${item.price}</span></p>
                <p className={`${item.size === 0 ? "hidden" : "flex gap-2 p-style"}`}>Size: {item.size.map((siz,idx)=>(
                  <>
                  <span key={idx} className='flex span-style'>{siz}</span>
                  </>
                ))}</p>
                </Link>
            </li>
        ))}
        </ul>
    </div>
  )
}

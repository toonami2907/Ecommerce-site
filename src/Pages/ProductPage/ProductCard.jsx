import React from 'react'
import { Link } from 'react-router-dom'

export const ProductData = [
  { name: "Nike Chill Knit", descript: "Women's Tight Cropped Mini-Rib Tank Top",
   imgURL: "/dunk.png", price: 45 },
  { name: "Nike Knit", descript: " Mini-Rib Tank Top", imgURL: "/dunk.png", price: 45 },
  { name: "Nike  Chill Knit", descript: " Mini-Rib Tank Top", imgURL: "/dunk.png", price: 45 },
  { name: "Nike ", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
  { name: " Chill Knit", descript: "Women's Tight Cropped ", imgURL: "/dunk.png", price: 45 },
]


export const productCount = ProductData.length


export default function ProductCard() {
  // const ProductID = (id) =>{

  // }
 
  return (
    <section className='py-2 px-5 max-h-screen overflow-y-auto'>
    <div className='relative grid grid-cols-2  lg:grid-cols-3 gap-2'>
      {ProductData.map((item, idx) => (
        <Link key={idx} to={`/about/${item.name}`}>
          <div className="aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-gray-200  ">
            <img src={item.imgURL} alt="" className=' object-cover object-center transition duration-1000 transform hover:scale-105' />
          </div>
          <div className='text-lg font-semibold py-2 space-y-1'>
            <h1 className='text-sm'>{item.name}</h1>
            <p className='text-gray-700 text-sm md:text-[17px] '>{item.descript}</p>
            <h1 className='font-medium'>${item.price}</h1>
          </div>
        </Link>
      ))}
     </div>
      </section>



  )
}

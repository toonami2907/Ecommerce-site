import React from 'react'
import Banner from '../Sections/Banner'
import ProductCard from './ProductPage/ProductCard'
import { Toaster } from 'react-hot-toast'
import Hero from '../Sections/Hero'
import Product_section from '../Sections/Product_section'
import User_list from './User/user_list'

export default function Home() {
  return (
    <div>
      <Toaster />
      <Banner />
      {/* The product card was just for content on the page so i have remove it  */}
      <Hero />
      <Product_section/>
    </div>
  )
}

import React from 'react'
import Banner from '../Sections/Banner'
import ProductCard from './ProductPage/ProductCard'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div>
      <Toaster/>
        <Banner/>
        <ProductCard/>
    </div>
  )
}

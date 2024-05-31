import React from 'react'
import {Outlet} from 'react-router-dom'
import  {Navbar} from '../src/components/Navbar.jsx'
import Footer from '../src/components/Footer.jsx'
import { Toaster } from 'react-hot-toast'
import { Navbar2 } from './Sections/Banner.jsx'

export default function Layout() {
  return (
    <div >
      <Toaster/>
        <Navbar2/>
        <Navbar/>
        <div className='h-screen flex flex-col flex-grow'>
        <Outlet/>
        </div>
    </div>
  )
}

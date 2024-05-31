import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import ProductHome from './Pages/ProductPage/ProductHome.jsx'
import { StateProvider } from './components/config/StateProvider.jsx'
import AddProduct from './Pages/ProductPage/AddProduct.jsx'
import Product_Details from './Pages/ProductPage/Product_Details.jsx'
import Sign_Up from './Auth/Sign_Up.jsx'
import Sign_In from './Auth/Sign_In.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <StateProvider>
 <Routes>
  <Route path='/' element={<Layout/>}>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Sign_Up/>}/>
    <Route path='/login' element={<Sign_In/>}/>
    <Route path='/add' element={<AddProduct/>}/>
    <Route path='/about/:id' element={<Product_Details/>}/>
    <Route path='/Product/:id' element={<ProductHome/>}/>
  </Route>
 </Routes>

 </StateProvider>
 </BrowserRouter>
)

// index.js or App.js
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Layout.jsx';
import { StateProvider } from './components/config/StateProvider.jsx';
import Loading from './components/Loading.jsx';





const Home = lazy(() => import('./Pages/Home.jsx'));
const ProductHome = lazy(() => import('./Pages/ProductPage/ProductHome.jsx'));
const User_list = lazy(() => import('./Pages/User/user_list.jsx'));
const AddProduct = lazy(() => import('./Pages/ProductPage/AddProduct.jsx'));
const Product_Details = lazy(() => import('./Pages/ProductPage/Product_Details.jsx'));
const Sign_Up = lazy(() => import('./Auth/Sign_Up.jsx'));
const Sign_In = lazy(() => import('./Auth/Sign_In.jsx'));
const Check_out = lazy(() => import('./Pages/ProductPage/Check_out.jsx'));
const Admin_layout = lazy(()=> import("./admin_layout.jsx"))
const Product = lazy(()=> import("./Pages/Admin_page/Product.jsx"))

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StateProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Sign_Up />} />
            <Route path='/login' element={<Sign_In />} />
            <Route path='/cart/checkout' element={<Check_out />} />
            <Route path='/about/:id' element={<Product_Details />} />
            <Route path='/Product/:id' element={<ProductHome />} />
          </Route>
            <Route path='/dashboard' element={<Admin_layout/>}>
            <Route path='/dashboard/all_user' element={<User_list />} />
            <Route path='/dashboard/add' element={<AddProduct />} />
            <Route path='/dashboard/product' element={<Product />} />
            </Route>
        </Routes>
      </Suspense>
    </StateProvider>
  </BrowserRouter>
);

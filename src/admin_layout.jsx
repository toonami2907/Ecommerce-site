// Layout2.js
import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import Admin_Sidebar from './Pages/Admin_page/Admin_sidebar';

export default function Admin_layout() {
    const [hid, setHid] = useState(false);
    const userID = localStorage.getItem("userID");
    const toggleNavbar = () => {
        setHid(!hid);
    };

    return (
        <div>
            {userID ?  <div className="flex w-full">
            <div className={`w-[12rem] z-50 ${hid ? 'hidden' : 'md:flex lg:relative fixed'}`}>
                <Admin_Sidebar hid={hid} toggleNavbar={toggleNavbar} />
            </div>
            <div className="flex-grow">
                <div className="overflow-x-auto">
                <button onClick={toggleNavbar} className={`${hid ? 'flex fixed' : 'hidden'} absolute top-1 bg-white drop-shadow-lg z-50 text-black left-1 px-2 py-1 rounded-full`}>
                <Menu />
            </button>
                    <div className='h-[70px] flex justify-between items-center px-5 bg-white border border-gray-200'>
                        <ul className='flex gap-3 lg:gap-7 items-center'>
                          <button >
                          <Bell fill='rgb(172, 168, 168)' color='rgb(172, 168, 168)'/>
                          </button>
                          <button  className='px-1.5 py-1.5 border border-x-2 border-y-2 border-gray-200 rounded-full bg-blue-300'>
                          <User fill='white' color='white' size={20}/>
                          </button>
                          <button className=''>
                            <LogOut size={20} color='rgb(172, 168, 168)'/>
                          </button>
                        </ul>
                    </div>
                    <section className='px-5 mt-5'>
                        <Outlet />
                    </section>
                </div>
            </div>
        </div> : <Navigate to="/login"/> }
        </div>
       
    );
}

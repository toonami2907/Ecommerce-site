// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Calendar, BarChart2, Folder, LayoutDashboard, Inbox, Users, Menu, CreditCard, X, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
const navigationItems = [
    { name: 'Users', icon: Users, href: '/dashboard/all_user' },
    { name: 'Products', icon: CreditCard, href: '/dashboard/product' },
    { name: 'Add Products', icon: Calendar, href: '/dashboard/add' },
    { name: 'Coin', icon: Coins, href: '/dashboard/project' },
    { name: 'Referrals', icon: BarChart2, href: '#' },
];

const secondaryNavigation = [
    { name: 'Website redesign', href: '#' },
    { name: 'GraphQL API', href: '#' },
    { name: 'Customer migration guides', href: '#' },
    { name: 'Profit sharing program', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Admin_Sidebar({ hid, toggleNavbar }) {
    const [current, setCurrent] = useState('');

    useEffect(() => {
        document.title = current !== '' ? `${current} - lOGO` : 'lOGO';
    }, [current]);

    return (
        <div className=' z-50 h-full fixed  bg-white'>
            <Toaster/>
            <button onClick={toggleNavbar} className={`${hid ? 'hidden' : 'flex fixed'} relative text-gray-700 top-1 bg-white rounded-full drop-shadow-xl z-50 px-2 py-1 right-0 `}>
                <X />
            </button>
            
            {!hid && (
                <div className="flex  flex-col  flex-grow border-r border-gray-200 pt-5 pb-4  overflow-y-auto" style={{ width: '12rem' }}>
                    <div className="flex flex-col bg-white items-center flex-shrink-0 ">
                        <Link to='/' className="text-2xl font-bold">Logo</Link>
                    </div>
                    <div className="mt-5 flex-grow flex flex-col">
                        <nav className="flex-1 px-2 space-y-8 bg-white" aria-label="Sidebar">
                            <div className="space-y-1">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setCurrent(item.name)}
                                        className={classNames(
                                            item.name === current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.name === current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="space-y-1">
                                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
                                    Projects
                                </h3>
                                <div className="space-y-1" role="group" aria-labelledby="projects-headline">
                                    {secondaryNavigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setCurrent(item.name)}
                                            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                        >
                                            <span className="truncate">{item.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}

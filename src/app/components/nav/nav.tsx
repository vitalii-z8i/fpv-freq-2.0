'use client';

import React from 'react';
import Logo from './logo';

export default function Nav({ children }: { children: React.JSX.Element | React.JSX.Element[] }) {
    const [ collapsed, setCollapsed ] = React.useState(true)

    function toggleNavbar() {
        setCollapsed(!collapsed)
    }

    return (
        <nav className="border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo/>
                <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={`${collapsed && 'hidden'} w-full md:block md:w-auto`}>
                    <ul className="font-medium flex flex-col mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 bg-gray-50" onClick={() => {setCollapsed(true)}}>
                        {children}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

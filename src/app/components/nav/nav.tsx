import React from 'react';

export default function Nav({ children }: { children: React.JSX.Element | React.JSX.Element[] }) {
    return (
        <nav className="z-10 fixed bottom-0 border-t py-5 w-screen border-gray-200 bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
            <ul className="font-normal flex justify-evenly" >
                {children}
            </ul>
        </nav>
    )
}

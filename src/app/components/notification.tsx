import { useState } from "react"

export default function Notification({ isOn, message }: { isOn: boolean, message: string }) {
    return (
        <div className="fixed top-14 left-0 z-30 w-full items-center px-3">
            <div className={`${ isOn ? 'opacity-100' : 'opacity-0' }
             flex items-center
             transition-opacity ease-in duration-600
             border rounded-lg border-gray-300 dark:border-gray-600
             py-4 text-xl text-gray-700 dark:text-gray-100
             bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-gray-500 inline pr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                {message}
            </div>
        </div>
    )
}

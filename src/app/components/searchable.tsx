'use client';

import React, { useRef, useEffect, useState } from "react";

export default function Searchable<ResultType>({
    placeholder = 'Пошук',
    source,
    getKey,
    getLabel,
    filterCriteria = (() => true),
    onSelected = (() => {})
}: {
    placeholder: string,
    source: ResultType[],
    getKey: (item: ResultType) => string,
    getLabel: (item: ResultType) => string,
    filterCriteria: (item: ResultType, searchTerm: string) => boolean,
    onSelected?: (selected: ResultType) => void
}) {

    const [ searchTerm, setSearchTerm ] = React.useState('')
    const elementRef = useRef<HTMLInputElement>(null);
    const [isVisible, setIsVisible] = useState(false);


    function handleFocus() {
        setSearchTerm('')
    }

    function handleBlur() {
        setSearchTerm('')
    }

    function selectItem(ch?: ResultType) {
        setSearchTerm('')
        if (ch && !!getKey(ch)) {
            onSelected(ch)
        }
    }

    function filteredResults() {
        if (searchTerm.toString() === '') {
            return source
        } else {
            return source.filter((item: ResultType) => filterCriteria(item, searchTerm))
        }
    }

    function resultsOptions () {
        return filteredResults()
            .slice(0, 9)
    }

    function resultsList() {
        const list = resultsOptions()
        if (list.length === 0) {
            return <p className="text-center">Нічого не знайдено</p>
        }
        return list.map((res: ResultType) => {
            return <li className="cursor-pointer py-2 text-sm border-b border-gray-300 dark:border-gray-600 last:border-0 last:pb-0 first:pt-1" key={getKey(res)} onMouseDown={() => {selectItem(res)}}>{ getLabel(res) }</li>
        })
    }


    useEffect(() => {
        const handleScroll = () => {
          if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect()
            const isVisible = rect.top === 0
            setIsVisible(isVisible)
          }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check on component mount
        handleScroll();

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div className="sticky top-0 pt-5 pb-5 z-10">
            <div ref={elementRef}
                 className={`
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                    transition delay-0 duration-500 ease-in-out
                    absolute w-screen top-0 h-full
                    bg-stone-100 dark:bg-zinc-800 shadow-lg
                `} style={{left: 'calc(-50vw + 50%)'}}></div>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text"
                        className="rounded-lg outline-none focus:rounded-b-none ps-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target?.value)}}
                        onKeyDown={(e) => { if (!!searchTerm && e.key === 'Enter') { selectItem(resultsOptions()[0]) } } }
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                />
                <ul className={`${searchTerm ? 'block' : 'hidden'} absolute bg-stone-100 border border-gray-300 text-gray-900 text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                    {resultsList()}
                </ul>
            </div>
        </div>
    )
}

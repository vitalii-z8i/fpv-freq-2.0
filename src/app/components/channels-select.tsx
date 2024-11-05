'use client';

import React from "react";
import channels from "../../../public/channels.json";

export default function ChannelsSelect({ onSelected = (() => {}) }: { onSelected?: (ch: FPVChannel) => void }) {
    const [ searchTerm, setSearchTerm ] = React.useState('')

    function handleFocus() {
        setSearchTerm('')
    }

    function handleBlur() {
        setSearchTerm('')
    }

    function selectChannel(ch: FPVChannel) {
        setSearchTerm('')
        if (ch?.channel) {
            onSelected(ch)
        }
    }

    function filteredChannels() {
        if (searchTerm.toString() === '') {
            return channels
        } else {
            return channels.filter((ch: FPVChannel) => ch.channel.toUpperCase().includes(`${searchTerm}`.toUpperCase()) || `${ch.frequency}`.includes(`${searchTerm}`))
        }
    }

    function channelsOptions () {
        return filteredChannels()
            .slice(0, 9)
    }

    function channelsList() {
        const list = channelsOptions()
        if (list.length === 0) {
            return <p className="text-center">Нічого не знайдено</p>
        }
        return list.map((ch: FPVChannel) => {
            return <li className="cursor-pointer py-2 text-sm border-b border-gray-300 dark:border-gray-600 last:border-0 last:pb-0 first:pt-1" key={ch.channel} onMouseDown={() => {selectChannel(ch)}}>{ ch.channel } ({ ch.frequency })</li>
        })
    }

    return (
        <div className="relative mb-4 z-10">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text"
                    className="rounded-lg outline-none focus:rounded-b-none ps-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="5.8 канал, або частота"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target?.value)}}
                    onKeyDown={(e) => { if (!!searchTerm && e.key === 'Enter') { selectChannel(channelsOptions()[0]) } } }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
            />
            <ul className={`${searchTerm ? 'block' : 'hidden'} absolute bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                {channelsList()}
            </ul>
        </div>
    )
}

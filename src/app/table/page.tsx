'use client';

import React from "react";
import ChannelsSelect from "../components/channels-select";
import channels from "../../../public/channels.json"
import CalculateCompability from "../functions/calculate-compability";

export default function Table() {
    const [selectedChannels, setSelectedChannels] = React.useState([] as string[])
    const [interferredChannels, setInterferredChannels] = React.useState([] as string[])

    function isSelected(chId: string): boolean {
        return selectedChannels.includes(chId)
    }

    function isInterferred(chId: string): boolean {
        return interferredChannels.includes(chId)
    }

    function toggleChannel(chId: string) {
        const updatedList: string[] = []
        if (isSelected(chId)) {
            selectedChannels.splice(selectedChannels.indexOf(chId), 1)
            updatedList.push(...selectedChannels)
        } else {
            updatedList.push(...selectedChannels, chId)
        }

        setSelectedChannels(updatedList)
        setInterferredChannels([
            ...CalculateCompability(channels, channels.filter((ch) => updatedList.includes(ch.id))).map((ch) => ch.id).filter((chId) => !updatedList.includes(chId))
        ])
    }

    function clearSelection() {
        setSelectedChannels([])
        setInterferredChannels([])
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-center text-2xl">Таблиця Каналів</h2>
                {(selectedChannels.length > 0) ? (
                    <button onClick={clearSelection} title="Очистити" className="p-1 rounded-lg outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                ): <></>}
            </div>
            <p className="mb-2">Обрахунок вільних каналів в реальному часі.</p>
            <p className="mb-4 text-xs"> Активуйте зайняті канали через пошук або в таблиці, та спостерігайте які частоти залишаються вільними</p>
            <ChannelsSelect onSelected={(ch) => toggleChannel(ch.id)}/>
            <ul className="grid grid-cols-4 md:grid-cols-8">
                {channels.map((ch) => {
                    return (
                        <li
                            className="text-center text-xs items-center cursor-pointer"
                            key={ch.id}
                            onClick={() => {toggleChannel(ch.id)}}
                        >
                            <div className={`
                                    m-1 p-2 px-1 border box-border bg-gray-50 dark:bg-gray-700 rounded-lg relative
                                    ${(isInterferred(ch.id)) ? 'bg-red-400 text-red-300 dark:bg-red-900 dark:text-red-400 dark:border-red-900' : ''}
                                    ${(isSelected(ch.id)) ? 'border-blue-500 rounded-tr-none ' : 'border-gray-600'}
                                `}>
                                {(isSelected(ch.id)) && (
                                    <div className="absolute top-0 right-0 bg-blue-500 rounded-bl-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="White" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-4 ml-0.5 mb-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}

                                <h5 className="block font-bold">{ch.channel}</h5>
                                <p className="block">{ch.frequency}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

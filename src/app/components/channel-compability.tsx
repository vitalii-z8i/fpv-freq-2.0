import React from "react";
import channels from "../../../public/channels.json";
import CalculateCompability from "../functions/calculate-compability"

export default function ChannelCompability({ channel, onUpdate =(()=>{}) }: { channel: FPVChannel, onUpdate?: Function }) {
    return (
        <div className="border-2 md:border-0 border-gray-100 rounded-lg dark:border-gray-700 py-2 px-2 md:px-0 mb-6">
            <h3 className="mb-2 font-bold text-xl">Не сумісний з:</h3>
            <ul className="flex font-bold flex-wrap justify-start">
                {
                    CalculateCompability(channels, [channel]).map((nc) => {
                        return (
                            <li
                                className="flex text-center items-center text-lg px-1 mr-2 mb-2 border-2 border-gray-200 rounded-lg bg-rose-50 dark:bg-gray-700 dark:border-gray-700 hover:opacity-80 cursor-pointer"
                                key={nc.id}
                                onClick={() => onUpdate(nc)}>
                                <div className="w-3 h-3 bg-clip-content p-0.5 mr-1 bg-red-500 border border-red-800 rounded-full"></div>
                                {nc.channel} ({nc.frequency})
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
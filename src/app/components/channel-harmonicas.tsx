import React from "react";
import CalculateHarmonicas from "../functions/calculate-harmonicas";

export default function ChannelHarmonicas({ channel }: { channel: FPVChannel }) {
    if (channel?.channel) {
        return (
            <div className="border-2 md:border-0 border-gray-100 rounded-lg dark:border-zinc-700 py-2 px-2 md:px-0">
                <h3 className="mb-2 font-bold text-xl">Не рекомендується керування на частотах:</h3>
                <h4 className="mb-2 font-bold text-base">Дані частоти керування можуть давати перешкоди (гармоніки) на обраний відео-канал</h4>
                <ul className="flex font-bold flex-wrap justify-start">
                    {
                        CalculateHarmonicas(channel).map((nc) => {
                            return (
                                <li
                                    className="flex text-center items-center text-lg px-1 mr-2 mb-2 border-2 border-gray-200 rounded-lg bg-rose-50 dark:bg-zinc-700 dark:border-zinc-700 hover:opacity-80 cursor-pointer"
                                    key={nc.ctrlName}>
                                    {nc.ctrlName}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

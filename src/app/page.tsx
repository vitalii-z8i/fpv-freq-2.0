'use client';

import React from "react";
import ChannelsSelect from "./components/channels-select";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()
    function renderChannel (ch: FPVChannel) {
        router.push(`/channels/${ch.id}`)
    }

    return (
        <>
            <ChannelsSelect onSelected={renderChannel}/>
            <div className="w-full h-full text-center py-5">
                <h3 className="text-lg">Оберіть канал вище щоб побачити список каналів, які можуть вам заважати</h3>
            </div>
        </>
    );
}

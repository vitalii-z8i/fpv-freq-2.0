'use client';

import channels from "../../../../public/channels.json";

import React from "react";
import { useParams, useRouter, notFound } from "next/navigation";

import ChannelsSelect from "../../components/channels-select";
import ChannelCompability from "../../components/channel-compability";
import ChannelHarmonicas from "../../components/channel-harmonicas";
import Notification from "@/app/components/notification";

export default function Channel() {
    const router = useRouter()
    const { id }: { id: string } = useParams()
    const channel = channels.find(ch => ch.id === id.toLowerCase()) as FPVChannel
    const [showMsg, setShowMsg] = React.useState(false)

    if (!channel) {
        notFound()
    }

    function changeChannel(ch: FPVChannel): void {
        router.push(`/channels/${ch.id}`)
    }

    async function sharePage() {
        try {
            // Try to fetch the image
            const img = await fetch(`/images/channels/${channel.id}.png`)
            const blob = await img.blob()

            const shareData: ShareData = {
                title: `Канал ${channel.channel} (${channel.frequency})`,
                text: `Виліт! Канал ${channel.channel} (${channel.frequency})`,
                files: [
                    new File([blob], `${channel.id}.png`, { type: "image/png" })
                ],
                url: window.location.href
            }

            if (navigator.canShare && navigator.canShare(shareData)) {
                navigator.share(shareData)
            } else {
                navigator.clipboard.writeText(window.location.href)
                setShowMsg(true)
                setTimeout(() => { setShowMsg(false) }, 3000)
            }
        } catch {
            // If fetching the image fails (e.g., when offline), share without the image
            try {
                const textShareData: ShareData = {
                    title: `Канал ${channel.channel} (${channel.frequency})`,
                    text: `Виліт! Канал ${channel.channel} (${channel.frequency})`,
                    url: window.location.href
                }

                if (navigator.canShare && navigator.canShare(textShareData)) {
                    navigator.share(textShareData)
                } else {
                    navigator.clipboard.writeText(window.location.href)
                    setShowMsg(true)
                    setTimeout(() => { setShowMsg(false) }, 3000)
                }
            } catch {
                // Fallback to clipboard copy if sharing fails
                navigator.clipboard.writeText(window.location.href)
                setShowMsg(true)
                setTimeout(() => { setShowMsg(false) }, 3000)
            }
        }
    }

    return (
        <div className="pb-24">
            <ChannelsSelect onSelected={changeChannel}/>
            <div className="relative z-0">
                <h2 className="font-bold text-center text-2xl mb-4">{channel.channel} ({channel.frequency})</h2>
                <button onClick={sharePage} className="absolute right-0 top-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6  hover:fill-sky-700 dark:hover:fill-blue-200 hover:stroke-sky-700 dark:hover:stroke-blue-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                </button>
            </div>
            <ChannelCompability channel={channel}/>
            <ChannelHarmonicas channel={channel} />
            <Notification isOn={showMsg} message="Посилання Скопійовано."/>
        </div>
    );
}

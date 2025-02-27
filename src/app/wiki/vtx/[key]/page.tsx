"use client";

import { useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation"

import vtxTables from "@/../public/vtx-tables.json"
import Notification from "@/app/components/notification";
import SelectVTX from "@/app/components/select-vtx";

export default function Page() {
    const router = useRouter();
    const { key }: { key: string } = useParams()
    const vtxTable = vtxTables.find(table => table.key === key) as VTXTable
    const [showMsg, setShowMsg] = useState(false)


    if (!vtxTable) {
        notFound()
    }

    function copyText(text: string) {
        navigator.clipboard.writeText(text)
        setShowMsg(true)
        setTimeout(() => { setShowMsg(false) }, 3000)
    }

    function codeBlock(title: string, value: string) {

        return (
            <>
                <h3 className="mb-2 font-bold text-xl">{title}:</h3>
                <div className="bg-stone-100 dark:bg-zinc-800 text-xs md:text-sm border border-gray-100 rounded-lg dark:border-zinc-700 py-2 px-2 mb-6 relative">
                    <button onClick={() => copyText(value)} className="absolute right-0 top-0 hover:opacity-50 border border-gray-100 dark:border-zinc-700 rounded-tr-lg px-2 py-1" title="Скопіювати">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                    </button>
                    <code className="whitespace-pre-wrap">
                        {value}
                    </code>
                </div>
            </>
        )
    }

    return (
        <div className="pb-24">

            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-center text-2xl">Таблиці для VTX</h2>
            </div>
            <p className="mb-2">Тут ви можете знайти таблиці зі схемою каналів для відеопередавачів (VTX Table) популярних моделей</p>

            <SelectVTX onSelected={(vtx: VTXTable) => router.push(`/wiki/vtx/${vtx.key}`)}/>

            <h2 className="font-bold text-center text-2xl my-4">{vtxTable.name}</h2>
            { (!!vtxTable.cli) ? (
                codeBlock('Betafligh CLI', vtxTable.cli?.join('\n'))
            ) : '' }

            { (!!vtxTable.json) ? (
                codeBlock('JSON', JSON.stringify(vtxTable.json, null, 2))
            ) : '' }

            <Notification isOn={showMsg} message="Скопійовано."/>
        </div>
    )
}

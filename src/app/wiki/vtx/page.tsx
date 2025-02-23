import Link from "next/link";

import vtxTables from "../../../../public/vtx-tables.json";
import SelectVTX from "@/app/components/select-vtx";

export default function Vtx() {

    function vtxList() {
        return vtxTables.map(table => {
            return (
                <li className="border border-x-2 first:border-t-2 last:border-b-2 md:border-0 border-gray-100 first:rounded-t-lg last:rounded-b-lg dark:border-zinc-700 py-2 px-2 md:px-0">
                    <Link
                        href={`/wiki/vtx/${table.key}`}
                        className="hover:opacity-80"
                    >
                        {table.name}
                    </Link>
                </li>
            )
        })
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-center text-2xl">Таблиці для VTX</h2>
            </div>
            <p className="mb-2">Тут ви можете знайти таблиці зі схемою каналів для відеопередавачів (VTX Table) популярних моделей</p>

            <SelectVTX/>

            <ul>
                {vtxList()}
            </ul>
        </>
    )
}

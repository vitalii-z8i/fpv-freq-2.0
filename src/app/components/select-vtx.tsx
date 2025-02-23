"use client";

import vtxTables from "../../../public/vtx-tables.json";
import Searchable from "./searchable";

export default function SelectVTX({ onSelected = (() => {}) }: { onSelected?: (ch: VTXTable) => void }) {

    function getKey(ch: VTXTable) {
        return ch.key
    }

    function getLabel(ch: VTXTable) {
        return ch.name
    }

    function filterCriteria(ch: VTXTable, searchTerm: string) {
        return ch.name.toLowerCase().includes(`${searchTerm}`.toLowerCase())
    }

    return Searchable<VTXTable>({
        placeholder: "Назва VTX",
        source: vtxTables,
        getKey,
        getLabel,
        filterCriteria,
        onSelected
    })
}

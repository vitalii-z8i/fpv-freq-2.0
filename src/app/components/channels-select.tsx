"use client";
import channels from "../../../public/channels.json";
import Searchable from "./searchable";

export default function ChannelsSelect({ onSelected = (() => {}) }: { onSelected?: (ch: FPVChannel) => void }) {

    function getKey(ch: FPVChannel) {
        return ch.channel
    }
    function getLabel(ch: FPVChannel) {
        return `${ch.channel} (${ch.frequency})`
    }

    function filterCriteria(ch: FPVChannel, searchTerm: string) {
        return ch.channel.toUpperCase().includes(`${searchTerm}`.toUpperCase()) || `${ch.frequency}`.includes(`${searchTerm}`)
    }

    return Searchable<FPVChannel>({
        placeholder: '5.8 канал, або частота',
        source: channels,
        getKey,
        getLabel,
        filterCriteria,
        onSelected
    })
}

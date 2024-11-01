export default function CalculateCompability(channels: FPVChannel[], selected: FPVChannel[]): FPVChannel[] {
    function isInterfered(target1: FPVChannel, selected: FPVChannel[]) {
        return selected.some((s: FPVChannel) => target1.channel !== s.channel) && selected.some((s) => (Math.abs(target1.frequency - s.frequency) < 40))
    }

    return channels.filter((ch) => {
        return isInterfered(ch, selected)
    })
}

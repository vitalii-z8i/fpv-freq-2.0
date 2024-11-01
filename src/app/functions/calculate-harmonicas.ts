import harmonicas from "../../../public/harmonicas.json";

export default function CalculateHarmonicas(selected: FPVChannel): FPVHarmonica[] {
    return harmonicas.filter((har) => {
        return har.harmonicas.some((hr) => selected.frequency > hr[0] && selected.frequency < hr[1])
    })
}

type FPVChannel = { id: string, channel: string, frequency: number }
type FPVHarmonica = { ctrlName: string, harmonicas: Array<number, number>[] }
type VTXTableJSON = {
    description: string,
    version: string,
    vtx_table: {
        bands_list: { name: string, letter: string, is_factory_default?: boolean, frequencies: number[] }[],
        powerlevels_list?: { value: number, label: string }[],
    }
}
type VTXTable = { key: string, name: string, cli?: string[], json?: VTXTableJSON }

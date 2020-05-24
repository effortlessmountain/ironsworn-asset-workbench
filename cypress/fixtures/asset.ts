import { AssetDocument } from '../../src/models/models'

export default function getAsset(): AssetDocument {
    const asset = {
        documentFormatVersion: 2,
        abilities: [{
            filled: true,
            text: "Whenever you use your strength by rolling iron in battle, add +1 to your roll and subtract 1 from the track."
        }],
        description: "Your unusual strength gives you prowess in battle. Add +1 to your stored strength track each time you <em>Make Camp</em> or <em>Sojourn</em>.",
        name: "Strong",
        type: "Combat Talent",
        fonts: {},
        icon: "",
        track: 5,
        writeIn: ""
    }

    return asset
}
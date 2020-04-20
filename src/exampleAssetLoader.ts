import { ironclad, lightbearer, caveLion, berserker } from './exampleAssets'
import { setCurrentAsset } from './editor'

const showSingleAssetExample = (asset) => {
    setCurrentAsset(asset)
}

export const loadDefaultExampleAsset = () => showSingleAssetExample(caveLion)

const showLightbearerAssetButton: HTMLButtonElement = document.querySelector("#lightbearer-example")
showLightbearerAssetButton.onclick = () => showSingleAssetExample(lightbearer)

const showIroncladAssetButton: HTMLButtonElement = document.querySelector("#ironclad-example")
showIroncladAssetButton.onclick = () => showSingleAssetExample(ironclad)

const showCaveLionAssetButton: HTMLButtonElement = document.querySelector("#cave-lion-example")
showCaveLionAssetButton.onclick = () => showSingleAssetExample(caveLion)
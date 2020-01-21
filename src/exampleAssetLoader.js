import { showAsset } from './asset.js'
import { ironclad, lightbearer, caveLion, berserker } from './exampleAssets.js'
import { assetScale } from './assetScaling.js'
import { updateEditorWithAsset } from './editor.js'

const showSingleAssetExample = (asset) => {
    updateEditorWithAsset(asset)
    showAsset(asset, assetScale)
}

export const loadDefaultExampleAsset = () => showSingleAssetExample(ironclad)

const showLightbearerAssetButton = document.querySelector("#lightbearer-example")
showLightbearerAssetButton.onclick = () => showSingleAssetExample(lightbearer)

const showIroncladAssetButton = document.querySelector("#ironclad-example")
showIroncladAssetButton.onclick = () => showSingleAssetExample(ironclad)

const showCaveLionAssetButton = document.querySelector("#cave-lion-example")
showCaveLionAssetButton.onclick = () => showSingleAssetExample(caveLion)
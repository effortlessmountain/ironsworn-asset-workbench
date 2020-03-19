import { assetScale } from './assetScaling'
import { showAsset } from './asset'

export let currentAsset = {}

const assetInput: HTMLInputElement = document.querySelector('.interface-input')

export const updateCurrentAssetFromEditor = () => {
    //TODO: fail gracefully on invalid JSON
    currentAsset = JSON.parse(assetInput.value)
}

export const updateEditorWithAsset = (asset) => {
    currentAsset = asset
    assetInput.value = JSON.stringify(asset, null, 2)
}

const updateButton: HTMLButtonElement = document.querySelector(".update")

updateButton.onclick = () => {
    updateCurrentAssetFromEditor()
    showAsset(currentAsset, assetScale)
}
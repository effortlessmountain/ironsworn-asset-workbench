import { assetScale } from './assetScaling'
import { showAsset } from './asset'
import { transformToLatest } from './schema'

export let currentAsset = {}

const assetInput: HTMLInputElement = document.querySelector('.interface-input')

export const updateCurrentAssetFromEditor = () => {
    //TODO: fail gracefully on invalid JSON
    currentAsset = transformToLatest(JSON.parse(assetInput.value))
}

export const updateEditorWithAsset = (asset) => {
    currentAsset = transformToLatest(asset)
    assetInput.value = JSON.stringify(currentAsset, null, 2)
}

const updateButton: HTMLButtonElement = document.querySelector(".update")

updateButton.onclick = () => {
    updateCurrentAssetFromEditor()
    updateEditorWithAsset(currentAsset) //TODO: make better
    showAsset(currentAsset, assetScale)
}
import { showAsset } from './asset'
import { transformToLatest, transformSvgString, AssetDocumentV2 } from './schema'

export let currentAsset: AssetDocumentV2

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
    showAsset(currentAsset)
}

function handleFile() {
    const file = this.files[0];
    if (file) {
        var fileReader = new FileReader()
        fileReader.onload = (e) => {
            var svg = e.target.result as string
            currentAsset.icon = {
                type: "svg",
                name: file.name.split('.').slice(0, -1).join('.'),
                author: window.prompt("author of the svg?"),
                svg: transformSvgString(svg)
            }
            updateEditorWithAsset(currentAsset)
            showAsset(currentAsset)
        }
        fileReader.readAsText(file)
    } else {
        alert("missing file")
    }
}
const iconFileElement = (document.querySelector("#upload-icon") as HTMLInputElement)
iconFileElement.addEventListener("change", handleFile, false)
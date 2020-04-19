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

const iconFileInput = document.querySelector("#icon-fileselect") as HTMLInputElement
const iconAuthorInput = document.querySelector("#icon-author") as HTMLInputElement


function handleFile() {
    const file = iconFileInput.files[0];
    if (file) {
        var fileReader = new FileReader()
        fileReader.onload = (e) => {
            var svg = e.target.result as string
            currentAsset.icon = {
                type: "svg",
                name: file.name.split('.').slice(0, -1).join('.'),
                author: iconAuthorInput.value,
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
//iconFileElement.addEventListener("change", handleFile, false)

const iconImportButton: HTMLButtonElement = document.querySelector("#icon-import-button")
iconImportButton.onclick = () => {
    handleFile()
}
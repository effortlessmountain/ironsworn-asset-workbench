import { showAsset } from './asset'
import { transformToLatest, transformSvgString, AssetDocument } from './models'

export let currentAsset: AssetDocument

const assetInput: HTMLInputElement = document.querySelector('.interface-input')

export const setCurrentAsset = (asset) => {
    currentAsset = transformToLatest(asset)
    assetInput.value = JSON.stringify(currentAsset, null, 2)
    showAsset(currentAsset)
}

const updateButton: HTMLButtonElement = document.querySelector(".update")

updateButton.onclick = () => {
    try {
        setCurrentAsset(JSON.parse(assetInput.value))
    }
    catch (error) {
        window.alert(error)
    }
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
            setCurrentAsset(currentAsset)
        }
        fileReader.readAsText(file)
    } else {
        alert("missing file")
    }
}

const iconImportButton: HTMLButtonElement = document.querySelector("#icon-import-button")
iconImportButton.onclick = () => {
    handleFile()
}
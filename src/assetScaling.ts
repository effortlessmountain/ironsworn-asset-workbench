import { showAsset } from "./asset"
import { currentAsset } from "./editor"

export let scaleRatio = {
    "full": 1,
    "two-thirds": 2 / 3,
    "one-half": 0.5,
    "one-third": 1 / 3,
}

const calculateScale = () => {
    if (window.innerHeight > 1070) {
        return "full"
    } else if (window.innerHeight > 750) {
        return "two-thirds"
    } else {
        return "one-half"
    }
}

export let assetScale = { value: calculateScale() }


const scaleSelect: HTMLInputElement = document.querySelector("#scale-select")

const changeSize = (size) => {
    assetScale.value = size
    showAsset(currentAsset)
}

scaleSelect.addEventListener('change', (event) => {
    changeSize((event.currentTarget as HTMLInputElement).value)
})

scaleSelect.value = assetScale.value
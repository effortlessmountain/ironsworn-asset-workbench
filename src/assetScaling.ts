enum Scales {
    Full = "full",
    TwoThirds = "two-thirds",
    OneHalf = "one-half",
    OneThird = "one-third",
}

const calculateScale = () => {
    if (window.innerHeight > 1070) {
        return Scales.Full
    } else if (window.innerHeight > 750) {
        return Scales.TwoThirds
    } else {
        return Scales.OneHalf
    }
}

export let assetScale = calculateScale()


const scaleSelect: HTMLInputElement = document.querySelector("#scale-select")

const changeSize = (size) => {
    const asset = document.querySelector(".asset")
    for (let scale in Scales) {
        asset.classList.toggle(Scales[scale], Scales[scale] === size)
    }
    assetScale = size
}

scaleSelect.addEventListener('change', (event) => {
    changeSize((event.currentTarget as HTMLInputElement).value)
})

scaleSelect.value = assetScale
//TODO: rethink this enum
enum Scales {
    Full = "full",
    TwoThirds = "two-thirds",
    OneHalf = "one-half",
    OneThird = "one-third",
}

export let scaleRatio = {
    "full": 1,
    "two-thirds": 2/3,
    "one-half": 0.5,
    "one-third": 1/3,
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
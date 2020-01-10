const calculateScale = () => {
    if (window.innerHeight > 1070) {
        return "full"
    } else if (window.innerHeight > 750) {
        return "two-thirds"
    } else {
        return "one-half"
    }
}

export let assetScale = calculateScale()


const scaleSelect = document.querySelector("#scale-select")

const changeSize = (size) => {
    document.querySelector(".asset").classList = `asset ${size}`
    assetScale = size
}

scaleSelect.addEventListener('change', (event) => {
    changeSize(event.target.value)
})

scaleSelect.value = assetScale
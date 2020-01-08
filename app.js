import { caveLion, lightbearer, berserker, ironclad } from './src/exampleAssets.js'

const calculateScale = () => {
    if (window.innerHeight > 1070) {
        return "full"
    } else if (window.innerHeight > 750) {
        return "two-thirds"
    } else {
        return "one-half"
    }
}

const createWriteIn = (writeIn) => {
    return writeIn ? `<div class="write-in">${writeIn}</div>` : ""
}

const createDescription = (description) => {
    return description ? `<div class="description">${description}</div>` : ""
}

const createAbilitiesHtml = (abilities = []) => {
    const createAbilityName = (name) => {
        return name ? `<span class="ability-name">${name}</span>` : ""
    }
    return abilities.map((ability) => {
        return `<div class="ability">
                    <i class="dot ${ability.filled ? "filled" : "unfilled"}"></i>
                    <div class="ability-description">
                        ${createAbilityName(ability.name)}
                        ${ability.text}
                    </div>
                </div>`
    }).join("")
}

const createTrackValueHtml = (track, value) => {
    if (value > track) {
        return `<div class="value empty">
                    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'>
                        <line x1='0' y1='100' x2='100' y2='0' stroke='rgb(65,64,66)' style='stroke-width:3.5' />
                    </svg>
                </div>`
    } else {
        return `<div class="value number">+${value}</div>`
    }
}

const createTrackHtml = (track) => {
    if (!track) {
        return ""
    } else if (Array.isArray(track)) {
        const innerEntries = track.map(entry => {
            return `<div class="value text">${entry}</div>`
        }).join("")
        return `<div class="track">
                    ${innerEntries}
                </div>`
    } else {
        let trackLength = track > 5 ? track : 5
        let innerEntries = ""

        for (let i = 1; i <= trackLength; i++) {
            innerEntries += createTrackValueHtml(track, i)
        }
        return `<div class="track">
                    <div class="value">0</div>
                    ${innerEntries}
                </div>`
    }
}

const createIcon = (icon) => {
    if (typeof icon === "string") {
        return `<i class="header-icon">${icon}</i>`
    } else if (typeof icon === "object") {
        return `${icon.svg}`
    } else {
        return ""
    }
}
const createAssetHtml = (asset = {}, scale = "full") => {
    return `<div class="asset ${scale}">
            <div class="main-matter">
                <div class="top">
                    <div class="type">${asset.type}</div>
                    <div class="header-circle">
                        ${createIcon(asset.icon)}
                    </div>
                    <div class="asset-name">${asset.name}</div>
                </div>
                <div class="details">
                    ${createWriteIn(asset.writeIn)}
                    ${createDescription(asset.description)}
                    <div class="abilities">
                        ${createAbilitiesHtml(asset.abilities)}
                    </div>
                </div>
            </div>
            ${createTrackHtml(asset.track)}
        </div>`
}


const assetInput = document.querySelector('.interface-input')
const assetContainer = document.querySelector(".assets")
const updateButton = document.querySelector(".update")
const showLightbearerAssetButton = document.querySelector("#lightbearer-example")
const showIroncladAssetButton = document.querySelector("#ironclad-example")
const showCaveLionAssetButton = document.querySelector("#cave-lion-example")
const downloadButton = document.querySelector("#download")
const closeDownloadbutton = document.querySelector("#done-downloading")
const downloadContainer = document.querySelector(".image-container")

const showSingleAssetExample = (asset) => {
    assetInput.value = JSON.stringify(asset, null, 2)
    assetContainer.innerHTML = createAssetHtml(asset, window.IAW_scale)
    setSvgDimensions()
}

const showScreen = (screen) => {
    if (screen === "download") {
        document.body.className = "download-screen"
    } else if (screen === "main") {
        document.body.className = "main-screen"
    } else if (screen === "render") {
        document.body.className = "render"
    } else if (screen === "help") {
        document.body.className = "help-screen"
    }
}

const showHelpButton = document.querySelector('#show-help')
showHelpButton.onclick = () => showScreen("help")
const closeHelpbutton = document.querySelector("#close-help")
closeHelpbutton.onclick = () => showScreen("main")


const saveImage = (uri, filename) => {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const setSvgDimensions = () => {
    const svgs = document.querySelectorAll('svg')
    svgs.forEach(svg => {
        svg.setAttribute('height', svg.parentNode.offsetHeight)
        svg.setAttribute('width', svg.parentNode.offsetWidth)
    })
}

const screenshot = () => {
    const render = document.querySelector('.render')
    const asset = document.querySelector('.asset')
    render.appendChild(asset)
    showScreen('render')
    window.scrollTo(0, 0)
    setSvgDimensions()
    html2canvas(asset,
        {
            allowTaint: true
            // width: "750",
            // height: "1050",
            // scale: 2
            // windowHeight: "1080px",
            // windowWidth: "1920px"
        }).then(canvas => {
            downloadContainer.appendChild(canvas)
            // saveImage(canvas.toDataURL(), 'asset.png') //TODO name after asset's name
            showScreen('download')
            document.querySelector('.assets').appendChild(asset)
        })
}

const closeDownload = () => {
    downloadContainer.innerHTML = ""
    showScreen('main')
}

updateButton.onclick = () => {
    let data = JSON.parse(assetInput.value)
    if (Array.isArray(data)) {
        assetContainer.innerHTML = data.map(createAssetHtml).join('')
    } else {
        assetContainer.innerHTML = createAssetHtml(data, window.IAW_scale)
    }
    setSvgDimensions()
}


showLightbearerAssetButton.onclick = () => showSingleAssetExample(lightbearer)
showIroncladAssetButton.onclick = () => showSingleAssetExample(ironclad)
showCaveLionAssetButton.onclick = () => showSingleAssetExample(caveLion)
downloadButton.onclick = screenshot
closeDownloadbutton.onclick = closeDownload



const scaleSelect = document.querySelector("#scale-select")

const changeSize = (size) => {
    document.querySelector(".asset").classList = `asset ${size}`
    window.IAW_scale = size
}

scaleSelect.addEventListener('change', (evemt) => {
    changeSize(event.target.value)
})

const setScale = (size) => scaleSelect.value = size

// initialize
window.IAW_scale = calculateScale()
setScale(window.IAW_scale)
showSingleAssetExample(ironclad)

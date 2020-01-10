export const setSvgDimensions = () => {
    const svgs = document.querySelectorAll('svg')
    svgs.forEach(svg => {
        svg.setAttribute('height', svg.parentNode.offsetHeight)
        svg.setAttribute('width', svg.parentNode.offsetWidth)
    })
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

export const createAssetHtml = (asset = {}, scale = "full") => {
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
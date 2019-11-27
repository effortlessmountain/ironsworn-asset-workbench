(() => {

    const bonded = {
        type: "path",
        icon: "◊",
        name: "Bonded",
        abilities: [
            {
                filled: true,
                text: "When you make a move which gives you an add for sharing a bond, add +1 more."
            },
            {
                text: "When you completely fill a box on your bonds progress track, envision what your relationships have taught you. Then, take +1 experience and +2 momentum."
            },
            {
                text: "When you make a move in a crucial moment and score a miss, you may cling to thoughts of your bond-kin for courage or encouragement. If you do, reroll any dice. On another miss, in addition to the outcome of the move, you must mark shaken or corrupted. If both debilities are already marked, <em>Face Desolation</em>."
            }
        ]
    }

    const berserker = {
        type: "combat talent",
        icon: "▿",
        name: "Berserker",
        writeIn: "",
        track: 0,
        description: "If you are clad only in animal pelts...",
        abilities: [
            {
                filled: true,
                name: "",
                text: "When you <em>Secure an Advantage</em> or <em>Compel</em> by embodying your wild nature, add +1 and take +1 momentum on a hit."
            },
            {
                filled: false,
                name: "",
                text: "When you <em>Strike</em> and score a hit, you may inflict +1 harm. If you do, choose one. <li>Push yourself: <em>Endure Harm</em> (1 harm).</li> <li>Lose yourself: <em>Endure Stress</em> (1 stress).</li>"
            },
            {
                filled: false,
                name: "",
                text: "When you <em>Endure Harm</em> in a fight, you may let the pain inflame your wildness (decide before rolling). The value of your action die is then halved, rounding up (1/2=1, 3/4=2, 5/6=3). If you score a strong hit, and choose to embrace the pain, take your modified action die value as +momentum."
            }
        ]
    }

    const caveLion = {
        type: "companion",
        icon: "C",
        name: "Cave Lion",
        writeIn: "Name",
        track: 4,
        description: "Your cat takes down its prey.",
        abilities: [
            {
                filled: false,
                name: "Eager",
                text: "When your cat chases down big game, you may <em>Resupply</em> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit."
            },
            {
                filled: false,
                name: "Inescapable",
                text: "When you <em>Enter the Fray</em> or <em>Strike</em> by sending your cat to attack, roll +edge. On a hit, take +2 momentum."
            },
            {
                filled: false,
                name: "Protective",
                text: "When you <em>Make Camp</em>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum."
            }
        ]
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
            return `<div class="value empty"></div>`
        } else {
            return `<div class="value">${value}</div>`
        }
    }

    const createTrackHtml = (track) => {
        if (!track) {
            return ""
        } else {
            return `<div class="track">
                    <div class="value zero">0</div>
                    ${createTrackValueHtml(track, 1)}
                    ${createTrackValueHtml(track, 2)}
                    ${createTrackValueHtml(track, 3)}
                    ${createTrackValueHtml(track, 4)}
                    ${createTrackValueHtml(track, 5)}
                </div>`
        }
    }

    const createAssetHtml = (asset = {}) => {
        return `<div class="asset">
                <div class="main-matter">
                    <div class="top">
                        <div class="type">${asset.type}</div>
                        <div class="header-circle">
                            <i class="header-icon">${asset.icon}</i>
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
    const showBondedAssetButton = document.querySelector("#bonded-example")
    const showBerserkerAssetButton = document.querySelector("#berserker-example")
    const showCaveLionAssetButton = document.querySelector("#cave-lion-example")
    const downloadButton = document.querySelector("#download")
    const closeDownloadbutton = document.querySelector("#done-downloading")
    const downloadContainer = document.querySelector(".image-container")

    const showSingleAssetExample = (asset) => {
        assetInput.value = JSON.stringify(asset, null, 2)
        assetContainer.innerHTML = createAssetHtml(asset)
    }

    const showScreen = (screen) => {
        if (screen === "download") {
            document.body.className = "download-screen"
        } else if (screen === "main") {
            document.body.className = "main-screen"
        }
    }

    const screenshot = () => {
        html2canvas(document.querySelector('.asset')).then(canvas => {
            downloadContainer.appendChild(canvas)
            showScreen('download')
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
            assetContainer.innerHTML = createAssetHtml(data)
        }
    }


    showBondedAssetButton.onclick = () => showSingleAssetExample(bonded)
    showBerserkerAssetButton.onclick = () => showSingleAssetExample(berserker)
    showCaveLionAssetButton.onclick = () => showSingleAssetExample(caveLion)
    downloadButton.onclick = screenshot
    closeDownloadbutton.onclick = closeDownload

    showSingleAssetExample(caveLion)


})()
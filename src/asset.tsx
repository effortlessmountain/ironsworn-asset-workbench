import React from 'react'
import ReactDOM from 'react-dom'

const WriteIn = (props: { writeIn?: string }) => {
    return props.writeIn ?
        <div className="write-in">{props.writeIn}</div> :
        null
}

const Description = (props: { description: string }) => {
    return props.description ?
        <div className="description">{props.description}</div> :
        null
}

interface Ability {
    name: string,
    filled: boolean,
    text: string
}
const Ability = (props: { ability: Ability, index: number }) => {
    const createAbilityName = (name) => {
        if (name) {
            return <span className="ability-name">{name}</span>
        } else {
            return ""
        }
    }
    //TODO: either sanitize first and only allow `b`, `em`, and `li` or parse markdown or custom markup
    return (
        <div className="ability" key={props.index}>
            <i className={props.ability.filled ? "dot filled" : "dot unfilled"}></i>
            <div className="ability-description">
                {createAbilityName(props.ability.name)}
                <span dangerouslySetInnerHTML={{__html: props.ability.text}}></span>
            </div>
        </div>)
}

const TrackValue = (props: {track: number, value: number}) => {
    if (props.value > props.track) {
        return <div className="value empty">
                    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'>
                        <line x1='0' y1='100' x2='100' y2='0' stroke='rgb(65,64,66)' style={{strokeWidth: 3.5}} />
                    </svg>
                </div>
    } else {
        return <div className="value number">+{props.value}</div>
    }
}

const Track = (props: {track: string[] | number}) => {
    if (!props.track) {
        return null
    } else if (Array.isArray(props.track)) {
        const innerEntries = props.track.map((entry, index) => {
            return <div className="value text" key={index}>{entry}</div>
        })
        return <div className="track">
                    {innerEntries}
                </div>
    } else {
        let trackLength = props.track > 5 ? props.track : 5
        let innerEntries = []

        for (let i = 1; i <= trackLength; i++) {
            innerEntries.push(<TrackValue track={props.track} value={i} key={i}></TrackValue>)
        }
        return <div className="track">
                    <div className="value">0</div>
                    {innerEntries}
                </div>
    }
}

const Icon = (props: { icon: string | { svg: string } }) => {
    let icon = props.icon
    if (typeof icon === "string") {
        return <i className="header-icon">{icon}</i>
    } else if (typeof icon === "object") {
        //TODO: sanitize, or expand out and fish out the relevant data (probably with a schema update)
        return (<span dangerouslySetInnerHTML={{ __html: icon.svg }}>

        </span>)
    } else {
        return <></>
    }
}

const populateIfExists = (text, value) => {
    return value ? text.replace("REPLACE", value) : ""
}

const createGoogleFontString = (...fonts) => {
    let urlifiedFonts = Array.from(new Set(fonts))
        .filter(font => font)
        .map(font => font.replace(/ /g, "+"))
        .join("|")
    return urlifiedFonts ? `https://fonts.googleapis.com/css?family=${urlifiedFonts}&display=swap` : ""
}

const defaultFontConfig = {
    assetTypeFontSize: "1.03em",
    assetTypeFont: "Simonetta",
    assetNameFontSize: "1.26em",
    assetNameFont: "Simonetta",
    detailsFontSize: "0.97em",
    detailsFont: "PT Serif",
    trackFontSize: "1.42em",
    trackFont: "Simonetta"
}

const makeMergedConfig = (config) => {
    //TODO: merge in a way that doesn't have the pitfall of overriding with invalid values
    // if an object with defined properties but values of "" or null or undefined gets passed in.
    return Object.assign({}, defaultFontConfig, config)
}

interface FontConfig {
    assetTypeFontSize: string,
    assetTypeFont: string,
    assetNameFontSize: string,
    assetNameFont: string,
    detailsFontSize: string,
    detailsFont: string,
    trackFontSize: string,
    trackFont: string,
}

const AssetStyles = (props: { fonts: object }) => {
    //TODO: put styles onto corresponding elements directly instead of living 'dangerously'.
    let fonts = props.fonts || {}
    let fontConfig: FontConfig = makeMergedConfig(fonts)
    console.log('fonts', fontConfig)
    let googleFonts = createGoogleFontString(fontConfig.assetTypeFont, fontConfig.assetNameFont, fontConfig.detailsFont, fontConfig.trackFont)

    //TODO: type these properties. (curious it's not a compile-time error. Maybe with strict: true in tsconfig?).
    return (<>
        <link rel="stylesheet" href={googleFonts} />
        <style dangerouslySetInnerHTML={{
            __html: `
                .type {
                    font-size: ${fontConfig.assetTypeFontSize};
                    font-family: "${fontConfig.assetTypeFont}";
                }
                .asset-name {
                    font-size: ${fontConfig.assetNameFontSize};
                    font-family: "${fontConfig.assetNameFont}";
                }
                .details {
                    font-size: ${fontConfig.detailsFontSize};
                    font-family: "${fontConfig.detailsFont}";
                }
                .value, .value.text, .value.number {
                    font-size: ${fontConfig.trackFontSize};
                    font-family: "${fontConfig.trackFont}";
                }`
        }}>

        </style>
    </>)
}

interface Asset {
    fonts: FontConfig,
    type: string,
    icon: string | { svg: string },
    name: string,
    writeIn: string,
    description: string,
    abilities: Ability[],
    track: string[]
}

interface AssetProps {
    asset: Asset,
    scale: string
}

const Asset = (props: AssetProps) => {
    let asset = props.asset
    return (<div className="asset {props.scale}">
        <AssetStyles fonts={asset.fonts}></AssetStyles>
        <div className="main-matter">
            <div className="top">
                <div className="type">{asset.type}</div>
                <div className="header-circle">
                    <Icon icon={asset.icon} />
                </div>
                <div className="asset-name">{asset.name}</div>
            </div>
            <div className="details">
                <WriteIn writeIn={asset.writeIn}></WriteIn>
                <Description description={asset.description} />
                <div className="abilities">
                    {asset.abilities.map((ability, index) => <Ability ability={ability} index={index}></Ability>)}
                </div>
            </div>
        </div>
        <Track track={asset.track} />
    </div>)
}

const setSvgDimensions = () => {
    const svgs = document.querySelectorAll('svg')
    svgs.forEach(svg => {
        //TODO: less typecasting madness
        svg.setAttribute('height', (svg.parentNode as HTMLElement).offsetHeight.toString())
        svg.setAttribute('width', (svg.parentNode as HTMLElement).offsetWidth.toString())
    })
}

export const showAssetIn = (element, asset, scaling) => {
    // element.innerHTML = createAssetHtml(asset, scaling)
    ReactDOM.render(<Asset asset={asset} scale={scaling} />,
        element)
    setSvgDimensions()
}

const assetContainer = document.querySelector(".assets")

export const showAsset = (asset, scaling) => {
    showAssetIn(assetContainer, asset, scaling)
}

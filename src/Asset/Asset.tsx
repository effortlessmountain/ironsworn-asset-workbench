import React from 'react'
import ReactDOM from 'react-dom'
import { scaleRatio, AssetScale } from '../assetScaling'
import { FontConfig, makeMergedConfig, createGoogleFontString } from '../models/assetStyleModels'


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
    name?: string,
    filled: boolean,
    text: string
}
const Ability = (props: { ability: Ability }) => {
    const createAbilityName = (name) => {
        if (name) {
            return <span className="ability-name">{name}</span>
        } else {
            return ""
        }
    }
    //TODO: either sanitize first and only allow `b`, `em`, and `li` or parse markdown or custom markup
    return (
        <div className="ability">
            <i className={props.ability.filled ? "dot filled" : "dot unfilled"}></i>
            <div className="ability-description">
                {createAbilityName(props.ability.name)}
                <span className="ability-text" dangerouslySetInnerHTML={{ __html: props.ability.text }}></span>
            </div>
        </div>)
}

const TrackValue = (props: { track: number, value: number, scale: string }) => {
    if (props.value > props.track) {
        return <div className="value empty">
            <svg xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                preserveAspectRatio='none'
                viewBox='0 0 100 100'
                height={95 * scaleRatio[props.scale]}
                width={113 * scaleRatio[props.scale]}>
                <line x1='0' y1='100' x2='100' y2='0' stroke='rgb(65,64,66)' style={{ strokeWidth: 3.5 }} />
            </svg>
        </div>
    } else {
        return <div className="value number">+{props.value}</div>
    }
}

const Track = (props: { track: string[] | number, scale: string }) => {
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
            innerEntries.push(<TrackValue track={props.track} value={i} scale={props.scale} key={i}></TrackValue>)
        }
        return <div className="track">
            <div className="value">0</div>
            {innerEntries}
        </div>
    }
}

const Icon = (props: { icon: string | { svg: { d: string, fill: string, fillOpacity: string } }, scale: string }) => {
    if (typeof props.icon === "string") {
        return (
            <div className="header-circle">
                <i className="header-icon">{props.icon}</i>
            </div>)
    } else if (typeof props.icon === "object") {
        return (
            <div className="header-circle">
                <svg
                    height={154 * scaleRatio[props.scale]}
                    width={154 * scaleRatio[props.scale]}
                    viewBox="0 0 512 512">
                    <g>
                        <path d={props.icon.svg.d} fill={props.icon.svg.fill} fillOpacity={props.icon.svg.fillOpacity}></path>
                    </g>
                </svg>
            </div>)
    } else {
        return null
    }
}

const AssetStyles = (props: { fonts: object }) => {
    //TODO: put styles onto corresponding elements directly instead of living 'dangerously'.
    let fonts = props.fonts || {}
    let fontConfig: FontConfig = makeMergedConfig(fonts)
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
    fonts?: FontConfig,
    type: string,
    icon?: string | { svg: { d: string, fill: string, fillOpacity: string } },
    name: string,
    writeIn?: string,
    description: string,
    abilities: Ability[],
    track?: number | string[]
}

interface AssetProps {
    asset: Asset,
    scale: AssetScale
}

export const Asset = (props: AssetProps) => {
    let asset = props.asset
    return (<div className={`asset ${props.scale}`}>
        <AssetStyles fonts={asset.fonts}></AssetStyles>
        <div className="main-matter">
            <div className="top">
                <div className="type">{asset.type}</div>
                <Icon icon={asset.icon} scale={props.scale} />
                <div className="asset-name">{asset.name}</div>
            </div>
            <div className="details">
                <WriteIn writeIn={asset.writeIn}></WriteIn>
                <Description description={asset.description} />
                <div className="abilities">
                    {asset.abilities.map((ability, index) => <Ability ability={ability} key={index}></Ability>)}
                </div>
            </div>
        </div>
        <Track track={asset.track} scale={props.scale} />
    </div >)
}

export const showAssetIn = (element, asset, scale, callback?: () => void) => {
    console.log("Showing asset with scale", scale, "in", element)
    // TODO: watch for state changes inside of a react component instead of re-rendering everything    
    ReactDOM.render(<Asset asset={asset} scale={scale} />,
        element, callback)
}
import React from 'react'
import ReactDOM from 'react-dom'
import sanitize from './sanitize'

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
export const Ability = (props: { ability: Ability }) => {
    const createAbilityName = (name) => {
        if (name) {
            return <span className="ability-name">{name}</span>
        } else {
            return ""
        }
    }

    //TODO: investigate parsing markdown or custom markup instead of allowing em, ul, li
    let sanitizedText = sanitize(props.ability.text)

    return (
        <div className="ability">
            <i className={props.ability.filled ? "dot filled" : "dot unfilled"}></i>
            <div className="ability-description">
                {createAbilityName(props.ability.name)}
                <span className="ability-text" dangerouslySetInnerHTML={{ __html: sanitizedText }}></span>
            </div>
        </div>)
}

const TrackValue = (props: {
    track: number,
    value: number,
    scale: string
}) => {
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

const Track = (props: {
    track: string[] | number,
    scale: string,
    style
}) => {
    if (!props.track) {
        return null
    } else if (Array.isArray(props.track)) {
        const innerEntries = props.track.map((entry, index) => {
            return <div className="value text" key={index}>{entry}</div>
        })
        return <div className="track" style={props.style}>
            {innerEntries}
        </div>
    } else {
        let trackLength = props.track > 5 ? props.track : 5
        let innerEntries = []

        for (let i = 1; i <= trackLength; i++) {
            innerEntries.push(<TrackValue track={props.track} value={i} scale={props.scale} key={i}></TrackValue>)
        }
        return <div className="track" style={props.style}>
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

const makeFontStyles = (unmergedFonts: FontConfig) => {
    let fonts: FontConfig = makeMergedConfig(unmergedFonts)
    let googleFontUrl = createGoogleFontString(fonts.assetTypeFont, fonts.assetNameFont, fonts.detailsFont, fonts.trackFont)

    return {
        googleFontUrl,
        type: {
            fontFamily: `"${fonts.assetTypeFont}"`,
            fontSize: fonts.assetTypeFontSize
        },
        assetName: {
            fontFamily: `"${fonts.assetNameFont}"`,
            fontSize: fonts.assetNameFontSize
        },
        details: {
            fontFamily: `"${fonts.detailsFont}"`,
            fontSize: fonts.detailsFontSize
        },
        track: {
            fontFamily: `"${fonts.trackFont}`,
            fontSize: fonts.trackFontSize
        }
    }
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
    let fonts = makeFontStyles(asset.fonts)

    //TODO: consolidate fonts into one global link. Less calls and may fix the race condition with preview/Download and fonts. 
    return (<div className={`asset ${props.scale}`}>
        <link rel="stylesheet" href={fonts.googleFontUrl} />
        <div className="main-matter">
            <div className="top">
                <div className="type" style={fonts.type}>{asset.type}</div>
                <Icon icon={asset.icon} scale={props.scale} />
                <div className="asset-name" style={fonts.assetName}>{asset.name}</div>
            </div>
            <div className="details" style={fonts.details}>
                <WriteIn writeIn={asset.writeIn}></WriteIn>
                <Description description={asset.description} />
                <div className="abilities">
                    {asset.abilities.map((ability, index) => <Ability ability={ability} key={index}></Ability>)}
                </div>
            </div>
        </div>
        <Track track={asset.track} scale={props.scale} style={fonts.track} />
    </div >)
}

export const showAssetIn = (element, asset, scale, callback?: () => void) => {
    console.log("Showing asset with scale", scale, "in", element)
    // TODO: watch for state changes inside of a react component instead of re-rendering everything    
    ReactDOM.render(<Asset asset={asset} scale={scale} />,
        element, callback)
}
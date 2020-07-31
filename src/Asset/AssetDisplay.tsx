import React from 'react'
import ReactDOM from 'react-dom'
import sanitize from './sanitize'

import { scaleRatio, AssetScale } from './assetScaling'
import { FontConfig, makeMergedConfig, createGoogleFontString, makeFontStyles } from './fonts'


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
export const AbilityDisplay = (props: { ability: Ability }) => {
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
    if (props.value === 0) {
        return <div className="value" key="zed">0</div>
    }
    else if (props.value <= props.track) {
        return <div className="value number">+{props.value}</div>
    } else {
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
    }
}

const TrackDisplay = (props: {
    track: string[] | number,
    scale: string,
    style
}) => {
    if (!props.track) {
        return null
    } else {
        let innerEntries = []

        if (Array.isArray(props.track)) {
            innerEntries = props.track.map((entry, index) => {
                return <div className="value text" key={index}>{entry}</div>
            })
        } else {
            let trackLength = Math.max(5, props.track)
            for (let i = 0; i <= trackLength; i++) {
                innerEntries.push(<TrackValue track={props.track} value={i} scale={props.scale} key={i}></TrackValue>)
            }
        }
        return <div className="track" style={props.style}>
            {innerEntries}
        </div>
    }
}

const IconDisplay = (props: { icon: string | { svg: { d: string, fill: string, fillOpacity: string } }, scale: string }) => {
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

export const AssetDisplay = (props: AssetProps) => {
    let asset = props.asset
    let fonts = makeFontStyles(asset.fonts)

    //TODO: consolidate fonts into one global link. Less calls and may fix the race condition with preview/Download and fonts. 
    return (<div className={`asset ${props.scale}`}>
        <link rel="stylesheet" href={fonts.googleFontUrl} />
        <div className="main-matter">
            <div className="top">
                <div className="type" style={fonts.type}>{asset.type}</div>
                <IconDisplay icon={asset.icon} scale={props.scale} />
                <div className="asset-name" style={fonts.assetName}>{asset.name}</div>
            </div>
            <div className="details" style={fonts.details}>
                <WriteIn writeIn={asset.writeIn}></WriteIn>
                <Description description={asset.description} />
                <div className="abilities">
                    {asset.abilities.map((ability, index) => <AbilityDisplay ability={ability} key={index}></AbilityDisplay>)}
                </div>
            </div>
        </div>
        <TrackDisplay track={asset.track} scale={props.scale} style={fonts.track} />
    </div >)
}

export const showAssetIn = (element, asset, scale, callback?: () => void) => {
    // TODO: watch for state changes inside of a react component instead of re-rendering everything    
    ReactDOM.render(<AssetDisplay asset={asset} scale={scale} />,
        element, callback)
}
import React, { useState } from 'react'
import { LabeledTextInput } from '../../LabeledTextInput'
import { AssetDocument } from '../../../models/models'
import { makeMergedConfig, defaultFontConfig } from '../../../models/assetStyles'
import { assign } from 'lodash'

function numberFromEm(em) {
    return +(em.replace("em", ""))
}

function emFromNumber(number) {
    return number + "em"
}

function FontSizeInput(props: {
    size: number;
    handleChange(e)
}) {
    return (<div className="number-input">
        <label>Size</label>
        <input type="number" value={props.size} step="0.01" onChange={props.handleChange}></input>
    </div>)
}

function FontInputs(props: {
    label: string,
    font: string,
    size: string,
    handleFontChange(e),
    handleSizeChange(e)
}) {
    return (<div className="font-inputs">
        <LabeledTextInput
            label={props.label}
            value={props.font}
            handleChange={props.handleFontChange}></LabeledTextInput>
        <FontSizeInput size={numberFromEm(props.size)} handleChange={props.handleSizeChange}></FontSizeInput>
    </div>)
}

export default function FontsView(props: {
    currentAsset: AssetDocument,
    setCurrentAsset(AssetDocument): void;
}) {
    const configuredFonts = makeMergedConfig(props.currentAsset.fonts || {})
    const [fonts, updateFonts] = useState(configuredFonts)

    function handleFontChange(setFontProperty) {
        return (e) => {
            const newFonts = { ...fonts }
            setFontProperty(newFonts, e.currentTarget.value)
            updateFonts(newFonts)
        }
    }

    function handleSizeChange(setSizeProperty) {
        return (e) => {
            const newFonts = { ...fonts }
            setSizeProperty(newFonts, emFromNumber(e.currentTarget.value))
            updateFonts(newFonts)
            props.currentAsset.fonts = fonts
            props.setCurrentAsset(props.currentAsset)
        }
    }

    return (<div className="editor-view">
        <h3>What fonts can I use?</h3>
        <p>The fonts from <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">Google Fonts</a> are supported. Put in the name of the font into the corresponding box here and you're all set! Note: font names are case-sensitive.</p>

        <FontInputs
            label="Asset Type font"
            font={fonts.assetTypeFont}
            size={fonts.assetTypeFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.assetTypeFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.assetTypeFontSize = val)}></FontInputs>
        <FontInputs
            label="Asset Name font"
            font={fonts.assetNameFont}
            size={fonts.assetNameFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.assetNameFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.assetNameFontSize = val)}></FontInputs>
        <FontInputs
            label="Details font"
            font={fonts.detailsFont}
            size={fonts.detailsFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.detailsFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.detailsFontSize = val)}></FontInputs>
        <FontInputs
            label="Track font"
            font={fonts.trackFont}
            size={fonts.trackFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.trackFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.trackFontSize = val)}></FontInputs>

        <button onClick={(e) => {
            props.currentAsset.fonts = fonts
            props.setCurrentAsset(props.currentAsset)
        }}>update fonts</button>
        <button onClick={() => {
            props.currentAsset.fonts = defaultFontConfig
            assign(fonts, defaultFontConfig)
            props.setCurrentAsset(props.currentAsset)
        }}>Reset to Default</button>
    </div>)
}

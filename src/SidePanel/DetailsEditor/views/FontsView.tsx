import React, { useState } from 'react'
import { LabeledTextInput, LabeledNumberInput } from '../../LabeledInputs'
import { AssetDocument } from '../../../models/assetModels'
import { makeMergedConfig, defaultFontConfig } from '../../../models/assetStyles'
import { assign } from 'lodash'

function numberFromEm(em) {
    return +(em.replace("em", ""))
}

function emFromNumber(number) {
    return number + "em"
}

function FontInputs(props: {
    label: string,
    idPrefix: string,
    font: string,
    size: string,
    handleFontChange(e),
    handleSizeChange(e)
}) {
    return (<div className="font-inputs">
        <LabeledTextInput
            label={props.label}
            id={`${props.idPrefix}-font-input`}
            value={props.font}
            handleChange={props.handleFontChange}></LabeledTextInput>
        <LabeledNumberInput label={props.label} id={`${props.idPrefix}-size-input`} value={numberFromEm(props.size)} step="0.01" handleChange={props.handleSizeChange}></LabeledNumberInput>
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
        return (value: number) => {
            const newFonts = { ...fonts }
            setSizeProperty(newFonts, emFromNumber(value))
            updateFonts(newFonts)
            props.currentAsset.fonts = newFonts
            props.setCurrentAsset(props.currentAsset)
        }
    }

    return (<div className="editor-view">
        <h3>What fonts can I use?</h3>
        <p>The fonts from <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">Google Fonts</a> are supported. Put in the name of the font into the corresponding box here and you're all set! Note: font names are case-sensitive.</p>

        <FontInputs
            label="Asset Type font"
            idPrefix="asset-type"
            font={fonts.assetTypeFont}
            size={fonts.assetTypeFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.assetTypeFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.assetTypeFontSize = val)}></FontInputs>
        <FontInputs
            label="Asset Name font"
            idPrefix="asset-name"
            font={fonts.assetNameFont}
            size={fonts.assetNameFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.assetNameFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.assetNameFontSize = val)}></FontInputs>
        <FontInputs
            label="Details font"
            idPrefix="details"
            font={fonts.detailsFont}
            size={fonts.detailsFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.detailsFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.detailsFontSize = val)}></FontInputs>
        <FontInputs
            label="Track font"
            idPrefix="track"
            font={fonts.trackFont}
            size={fonts.trackFontSize}
            handleFontChange={handleFontChange((fonts, val) => fonts.trackFont = val)}
            handleSizeChange={handleSizeChange((fonts, val) => fonts.trackFontSize = val)}></FontInputs>

        <button id="fonts-update-button"
            onClick={(e) => {
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

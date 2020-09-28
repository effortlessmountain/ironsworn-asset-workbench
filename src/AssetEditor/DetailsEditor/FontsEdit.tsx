import React, { useState } from "react";
import { LabeledTextInput, LabeledNumberInput } from "../LabeledInputs";
import { AssetDocument } from "../../Asset/asset";
import { makeMergedConfig, defaultFontConfig } from "../../Asset/fonts";
import { assign } from "lodash";

function numberFromEm(em) {
  return +em.replace("em", "");
}

function emFromNumber(number) {
  return number + "em";
}

function FontInputs(props: {
  label: string;
  idPrefix: string;
  font: string;
  size: string;
  handleFontChange(e);
  handleSizeChange(e);
}) {
  return (
    <div className="font-inputs">
      <LabeledTextInput
        label={props.label + " font"}
        id={`${props.idPrefix}-font-input`}
        value={props.font}
        handleChange={props.handleFontChange}
      ></LabeledTextInput>
      <LabeledNumberInput
        label={props.label + " size"}
        id={`${props.idPrefix}-size-input`}
        value={numberFromEm(props.size)}
        step="0.01"
        handleChange={props.handleSizeChange}
      ></LabeledNumberInput>
    </div>
  );
}

export function FontsEdit(props: {
  currentAsset: AssetDocument;
  updateAsset(AssetDocument): void;
}) {
  const configuredFonts = makeMergedConfig(props.currentAsset.fonts || {});
  const [fonts, updateFonts] = useState(configuredFonts);

  function handleFontChange(setFontProperty) {
    return (e) => {
      const newFonts = { ...fonts };
      setFontProperty(newFonts, e.currentTarget.value);
      updateFonts(newFonts);
    };
  }

  function handleSizeChange(setSizeProperty) {
    return (value: number) => {
      const newFonts = { ...fonts };
      setSizeProperty(newFonts, emFromNumber(value));
      updateFonts(newFonts);
      props.currentAsset.fonts = newFonts;
      props.updateAsset(props.currentAsset);
    };
  }

  return (
    <div className="editor-view">
      <h3>What fonts can I use?</h3>
      <p>
        The fonts from{" "}
        <a
          href="https://fonts.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Fonts
        </a>{" "}
        are supported. Put in the name of the font into the corresponding box
        here and you're all set! Font names are case-sensitive. If you want to
        use a Style other than the "Regular", click "Select This Style" on the
        Google Fonts Page, then click "Embed" on the sidebar that pops up on the
        right. Copy the part in bold ( such as <b>Red+Rose:wght@700</b> ) and
        paste it in below.
      </p>

      <FontInputs
        label="Asset Type"
        idPrefix="asset-type"
        font={fonts.assetTypeFont}
        size={fonts.assetTypeFontSize}
        handleFontChange={handleFontChange(
          (fonts, val) => (fonts.assetTypeFont = val)
        )}
        handleSizeChange={handleSizeChange(
          (fonts, val) => (fonts.assetTypeFontSize = val)
        )}
      ></FontInputs>
      <FontInputs
        label="Asset Name"
        idPrefix="asset-name"
        font={fonts.assetNameFont}
        size={fonts.assetNameFontSize}
        handleFontChange={handleFontChange(
          (fonts, val) => (fonts.assetNameFont = val)
        )}
        handleSizeChange={handleSizeChange(
          (fonts, val) => (fonts.assetNameFontSize = val)
        )}
      ></FontInputs>
      <FontInputs
        label="Details"
        idPrefix="details"
        font={fonts.detailsFont}
        size={fonts.detailsFontSize}
        handleFontChange={handleFontChange(
          (fonts, val) => (fonts.detailsFont = val)
        )}
        handleSizeChange={handleSizeChange(
          (fonts, val) => (fonts.detailsFontSize = val)
        )}
      ></FontInputs>
      <FontInputs
        label="Track"
        idPrefix="track"
        font={fonts.trackFont}
        size={fonts.trackFontSize}
        handleFontChange={handleFontChange(
          (fonts, val) => (fonts.trackFont = val)
        )}
        handleSizeChange={handleSizeChange(
          (fonts, val) => (fonts.trackFontSize = val)
        )}
      ></FontInputs>

      <button
        id="fonts-update-button"
        onClick={(e) => {
          props.currentAsset.fonts = fonts;
          props.updateAsset(props.currentAsset);
        }}
      >
        update fonts
      </button>
      <button
        onClick={() => {
          props.currentAsset.fonts = defaultFontConfig;
          assign(fonts, defaultFontConfig);
          props.updateAsset(props.currentAsset);
        }}
      >
        Reset to Default
      </button>
    </div>
  );
}

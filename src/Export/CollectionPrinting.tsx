import React, { useState } from "react";
import { AssetDocument } from "../Asset/asset";
import { RenderImage } from "./RenderImage";
import { AssetDisplay } from "../Asset/AssetDisplay";
import { PrintPreview } from "./PrintPreview";
import { AssetSelectionForPrinting } from "./AssetSelectionForPrinting";

export function CollectionPrinting(props: { assets: AssetDocument[]; back() }) {
  const [images, setImages] = useState([]);
  const [assetsToPrint, setAssetsToPrint] = useState([]);

  if (assetsToPrint.length === 0) {
    return (
      <AssetSelectionForPrinting
        back={props.back}
        assets={props.assets}
        setAssetsToPrint={setAssetsToPrint}
      ></AssetSelectionForPrinting>
    );
  }

  const startingIndex = images.length * 9;

  if (startingIndex >= assetsToPrint.length) {
    return <PrintPreview images={images} back={props.back}></PrintPreview>;
  }

  const assetsToRender = assetsToPrint.slice(startingIndex, startingIndex + 9);
  return (
    <RenderImage
      handleImage={(dataUrl) => {
        setImages([...images, dataUrl]);
      }}
    >
      <div className="sheet-of-assets">
        {assetsToRender.map((asset, index) => {
          return (
            <AssetDisplay key={index} asset={asset} scale="full"></AssetDisplay>
          );
        })}
      </div>
    </RenderImage>
  );
}

import React, { useState } from "react";
import { AssetDocument } from "../Asset/asset";
import { RenderImage } from "./RenderImage";
import { AssetDisplay } from "../Asset/AssetDisplay";
import { PrintPreview } from "./PrintPreview";
import { AssetSelectionForPrinting } from "./AssetSelectionForPrinting";

type Props = { assets: AssetDocument[] };

export function CollectionPrinting(props: Props) {
  const [images, setImages]: [string[], React.Dispatch<string[]>] = useState(
    []
  );
  const [assetsToPrint, setAssetsToPrint]: [
    AssetDocument[],
    React.Dispatch<AssetDocument[]>
  ] = useState([]);

  if (assetsToPrint.length === 0) {
    return (
      <AssetSelectionForPrinting
        assets={props.assets}
        setAssetsToPrint={setAssetsToPrint}
      ></AssetSelectionForPrinting>
    );
  }

  const startingIndex = images.length * 9;

  if (startingIndex >= assetsToPrint.length) {
    return <PrintPreview images={images}></PrintPreview>;
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

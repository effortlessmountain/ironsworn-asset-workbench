import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AssetDocument } from "../Asset/asset";
import { AssetDisplay } from "../Asset/AssetDisplay";
import { AssetScale } from "../Asset/assetScaling";
import { RenderImage } from "./RenderImage";

function ImagePreview(props: { alt: string; dataUrl: string }) {
  const history = useHistory();
  return (
    <div className="preview-download">
      <div className="image-container">
        <img src={props.dataUrl} alt={`${props.alt} asset`} />
      </div>
      <div className="preview-download-help">
        <p>
          Right click and 'Save image as...' to save. If the image is truncated,
          try making your browser window bigger before pressing 'preview' or
          'download as image'.
        </p>
        <button id="done-downloading" onClick={() => history.push("/")}>
          close
        </button>
      </div>
    </div>
  );
}

type ExportAssetProps = {
  asset: AssetDocument;
  index: number;
  scale: AssetScale;
  preview: boolean;
};

export function ExportAsset(props: ExportAssetProps) {
  const [image, setImage] = useState(null);
  const history = useHistory();

  function saveImage() {
    const link = document.createElement("a");
    link.href = image;
    link.download = props.asset.name + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    if (image && !props.preview) {
      saveImage();
      history.push(`/assets/${props.index}/edit`);
    }
  });

  if (!image) {
    return (
      <RenderImage handleImage={(dataUrl) => setImage(dataUrl)}>
        <AssetDisplay asset={props.asset} scale={props.scale}></AssetDisplay>
      </RenderImage>
    );
  } else if (props.preview) {
    return <ImagePreview dataUrl={image} alt={props.asset.name}></ImagePreview>;
  }
  return null;
}

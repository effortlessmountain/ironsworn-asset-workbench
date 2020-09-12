import React, { useState } from "react";
import { AssetDocument } from "../Asset/asset";
import { AssetDisplay } from "../Asset/AssetDisplay";
import { AssetScale } from "../Asset/assetScaling";
import { RenderImage } from "./RenderImage";

function ImagePreview(props: { alt: string; dataUrl: string; goBackToMain() }) {
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
        <button id="done-downloading" onClick={() => props.goBackToMain()}>
          close
        </button>
      </div>
    </div>
  );
}

type DownloadProps = {
  asset: AssetDocument;
  scale: AssetScale;
  goBackToMain: () => void;
  preview: boolean;
};

export function ExportAsset(props: DownloadProps) {
  const [image, setImage] = useState(null);

  function saveImage() {
    const link = document.createElement("a");
    link.href = image;
    link.download = props.asset.name + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!image) {
    return (
      <RenderImage handleImage={(dataUrl) => setImage(dataUrl)}>
        <AssetDisplay asset={props.asset} scale={props.scale}></AssetDisplay>
      </RenderImage>
    );
  } else if (props.preview) {
    return (
      <ImagePreview
        dataUrl={image}
        alt={props.asset.name}
        goBackToMain={props.goBackToMain}
      ></ImagePreview>
    );
  }
  saveImage();
  props.goBackToMain();
  return null;
}

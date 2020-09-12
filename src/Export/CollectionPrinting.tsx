import React, { useState } from "react";
import { AssetDocument } from "../Asset/asset";
import { RenderImage } from "./RenderImage";
import { AssetDisplay } from "../Asset/AssetDisplay";

export function CollectionPrinting(props: { assets: AssetDocument[]; back() }) {
  const [images, setImages] = useState([]);
  const startingIndex = images.length * 9;

  if (startingIndex < props.assets.length) {
    const assetsToRender = props.assets.slice(startingIndex, startingIndex + 9);
    return (
      <RenderImage
        handleImage={(dataUrl) => {
          setImages([...images, dataUrl]);
        }}
      >
        <div className="sheet-of-assets">
          {assetsToRender.map((asset, index) => {
            return (
              <AssetDisplay
                key={index}
                asset={asset}
                scale="full"
              ></AssetDisplay>
            );
          })}
        </div>
      </RenderImage>
    );
  }

  return (
    <>
      <section className="print-controls">
        <p>
          If you want a PDF, select "Print to PDF" as your printer when you
          print. If you want the images of the sheets of assets, right click and
          save.
        </p>
        <div className="vertical">
          <button onClick={window.print}>PRINT</button>
          <button onClick={props.back}>BACK</button>
        </div>
      </section>
      {images.map((image, i) => {
        return (
          <section className="print-page" key={i}>
            <img src={image} alt="A rendered page of assets"></img>
          </section>
        );
      })}
    </>
  );
}

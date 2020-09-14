import React, { useState } from "react";
import { AssetDocument } from "../Asset/asset";
export function AssetSelectionForPrinting(props: {
  assets: AssetDocument[];
  back();
  setAssetsToPrint(assets);
}) {
  const [selected, setSelected] = useState(
    new Set(props.assets.map((_, i) => i))
  );

  const handleChange = (i) => {
    const newSelected = new Set(selected);
    if (newSelected.has(i)) {
      newSelected.delete(i);
      setSelected(newSelected);
    } else {
      newSelected.add(i);
      setSelected(newSelected);
    }
  };

  const print = () => {
    props.setAssetsToPrint(props.assets.filter((_, i) => selected.has(i)));
  };

  const toggleAll = () => {
    if (selected.size === 0) {
      setSelected(new Set(props.assets.map((_, i) => i)));
    } else {
      setSelected(new Set());
    }
  };

  return (
    <section style={{ marginLeft: "20px" }}>
      <h2>Select assets to print:</h2>
      <div
        className="choose-to-print"
        style={{ marginBottom: "20px", fontSize: "18px", lineHeight: "25px" }}
      >
        <button onClick={toggleAll}>All/None</button>
        {props.assets.map((asset, i) => {
          return (
            <div className="asset-print-choice" key={i}>
              <input
                type="checkbox"
                checked={selected.has(i)}
                onChange={() => handleChange(i)}
              ></input>
              {asset.name}
            </div>
          );
        })}
      </div>
      <div className="vertical">
        <button onClick={print}>NEXT</button>
        <button onClick={props.back}>BACK</button>
      </div>
    </section>
  );
}
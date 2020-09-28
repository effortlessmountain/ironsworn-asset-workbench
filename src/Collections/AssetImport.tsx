import React from "react";
import { useHistory } from "react-router-dom";
import { CreateAsset } from "../App";

type Props = {
  createAsset: CreateAsset;
};

export function AssetImport(props: Props) {
  const history = useHistory();

  function handleAssetJsonImport() {
    //todo: move away from queryselecting and use a more idiomatic React appoach
    const iconFileInput = document.querySelector(
      "#asset-fileselect"
    ) as HTMLInputElement;

    const file = iconFileInput.files[0];
    if (file) {
      var fileReader = new FileReader();
      fileReader.onload = (e) => {
        var json = e.target.result as string;
        let importedAsset;
        try {
          importedAsset = JSON.parse(json);
          props.createAsset(importedAsset, (id) => {
            history.push(`/assets/${id}/edit`);
          });
          console.log("asset", importedAsset);
        } catch (e) {
          alert("Error parsing JSON from file" + file.name + ": " + e);
        }
      };
      fileReader.readAsText(file);
    } else {
      alert("Please select a file.");
    }
  }

  return (
    <div className="asset-import">
      <div className="vertical">
        <label htmlFor="asset-fileselect">Upload Asset in JSON format:</label>
        <input type="file" accept=".json" id="asset-fileselect" />
        <button onClick={handleAssetJsonImport}>IMPORT</button>
      </div>
    </div>
  );
}

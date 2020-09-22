import React, { SetStateAction, useState } from "react";
import { cloneDeep } from "lodash";
import { AssetEditor } from "./AssetEditor/AssetEditor";
import { AssetDocument, UnspecifiedAssetDocument } from "./Asset/asset";
import { transformToLatest } from "./Asset/assetTransformation";
import { calculateScale, AssetScale } from "./Asset/assetScaling";
import { ExportAsset } from "./Export/ExportAssetImage";
import AssetSelection from "./Collections/AssetSelection";
import AssetCreation from "./Collections/AssetCreation";
import { Collection, createCollection } from "./Collections/collection";
import { putLoneAssetIntoCollection } from "./Collections/collectionTransformation";
import { Footer } from "./Footer";
import { CollectionPrinting } from "./Export/CollectionPrinting";

type Screen = "choose" | "new" | "edit" | "preview-download" | "print";

export function sussCurrentCollection(maybeCollections, maybeAsset) {
  let startingCollection = null;
  if (maybeCollections && maybeCollections.length > 0) {
    startingCollection = maybeCollections[0];
  } else {
    if (maybeAsset) {
      startingCollection = putLoneAssetIntoCollection(maybeAsset);
    } else {
      startingCollection = createCollection();
    }
  }
  return startingCollection;
}

function selectDefaultScreen(assets): Screen {
  return assets.length === 0 ? "new" : "choose";
}

export default function App() {
  let maybeCollections = maybeGetLocalCollections();
  let maybeAsset = maybeGetLocalAsset();
  let startingCollection = sussCurrentCollection(maybeCollections, maybeAsset);
  let startingScale = calculateScale();

  const [currentAsset, setCurrentAsset]: [
    AssetDocument,
    React.Dispatch<AssetDocument>
  ] = useState(null);

  const [currentAssetIndex, setCurrentAssetIndex]: [
    number,
    React.Dispatch<number>
  ] = useState(null);

  const [currentCollection, setCurrentCollection]: [
    Collection,
    React.Dispatch<Collection>
  ] = useState(startingCollection);

  const [assetScale, setAssetScale]: [
    AssetScale,
    React.Dispatch<AssetScale>
  ] = useState(startingScale);

  const [previewDownload, setPreviewDownload]: [
    boolean,
    React.Dispatch<SetStateAction<boolean>>
  ] = useState(true);

  const [currentScreen, setCurrentScreen]: [
    Screen,
    React.Dispatch<Screen>
  ] = useState(selectDefaultScreen(startingCollection.assets));

  function maybeGetLocalCollections(): Collection[] {
    const maybeCollections = window.localStorage.getItem("collections");
    if (maybeCollections) {
      try {
        return JSON.parse(maybeCollections);
      } catch (error) {
        window.alert("Error parsing local collections: " + error.toString());
      }
    }
    return null;
  }

  function maybeGetLocalAsset(): UnspecifiedAssetDocument {
    const maybeAsset = window.localStorage.getItem("currentAsset");
    if (maybeAsset) {
      try {
        return JSON.parse(maybeAsset);
      } catch (error) {
        window.alert("Error parsing local asset: " + error.toString());
      }
    }
    return null;
  }

  function handleAssetScaleChange(newScale) {
    setAssetScale(newScale);
  }

  function persistCollection(collection) {
    window.localStorage.setItem("collections", JSON.stringify([collection]));
  }

  function updateAsset(asset) {
    currentCollection.assets[currentAssetIndex] = asset;
    persistCollection(currentCollection);
    setCurrentAsset(cloneDeep(transformToLatest(asset)));
  }

  function askToDelete() {
    if (window.confirm("Delete this asset?")) {
      currentCollection.assets.splice(currentAssetIndex, 1);
      persistCollection(currentCollection);
      setCurrentCollection(currentCollection);
      setCurrentScreen(selectDefaultScreen(currentCollection.assets));
    }
  }

  function createAsset(asset) {
    let index = currentCollection.assets.push(asset) - 1;
    window.localStorage.setItem(
      "collections",
      JSON.stringify([currentCollection])
    );
    setCurrentAsset(transformToLatest(asset));
    setCurrentAssetIndex(index);
    setCurrentCollection(currentCollection);
    setCurrentScreen("edit");
  }

  function chooseAsset(asset, index) {
    setCurrentAsset(transformToLatest(asset));
    setCurrentAssetIndex(index);
    setCurrentScreen("edit");
  }

  function showScreen(screen) {
    setCurrentScreen(screen);
  }

  function previewAssetImage() {
    setCurrentScreen("preview-download");
    setPreviewDownload(true);
  }

  function downloadAssetImage() {
    setCurrentScreen("preview-download");
    setPreviewDownload(false);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h2>
          Asset Workbench <span className="app-version">v0.17.0</span>
        </h2>
      </header>
      {currentScreen === "preview-download" && (
        <ExportAsset
          asset={currentAsset}
          scale={assetScale}
          goBackToMain={() => showScreen("edit")}
          preview={previewDownload}
        ></ExportAsset>
      )}

      {currentScreen === "choose" && (
        <AssetSelection
          chooseAsset={chooseAsset}
          showNewScreen={() => showScreen("new")}
          showPrintScreen={() => showScreen("print")}
          assets={currentCollection.assets}
        ></AssetSelection>
      )}

      {currentScreen === "new" && (
        <AssetCreation
          createAsset={createAsset}
          showChooseScreen={() => showScreen("choose")}
        ></AssetCreation>
      )}

      {currentScreen === "edit" && (
        <div className="container">
          <AssetEditor
            currentAsset={currentAsset}
            updateAsset={updateAsset}
            askToDelete={askToDelete}
            assetScale={assetScale}
            handleAssetScaleChange={handleAssetScaleChange}
            showScreen={showScreen}
            previewAssetImage={previewAssetImage}
            downloadAssetImage={downloadAssetImage}
          ></AssetEditor>
        </div>
      )}
      {currentScreen === "print" && (
        <CollectionPrinting
          assets={currentCollection.assets}
          back={() => showScreen("choose")}
        ></CollectionPrinting>
      )}
      <Footer></Footer>
    </div>
  );
}

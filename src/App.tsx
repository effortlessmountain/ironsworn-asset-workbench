import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { cloneDeep } from "lodash";

import { AssetEditor, HandleAssetScaleChange } from "./AssetEditor/AssetEditor";
import { AssetDocument, UnspecifiedAssetDocument } from "./Asset/asset";
import { transformToLatest } from "./Asset/assetTransformation";
import { calculateScale, AssetScale } from "./Asset/assetScaling";
import { ExportAsset } from "./Export/ExportAssetImage";
import AssetSelection from "./Collections/AssetSelection";
import AssetCreation from "./Collections/AssetCreation";
import { CollectionDocument, createCollection } from "./Collections/collection";
import { putLoneAssetIntoCollection } from "./Collections/collectionTransformation";
import { Footer } from "./Footer";
import { CollectionPrinting } from "./Export/CollectionPrinting";
import { AssetPopulater, SetCurrentAssetById } from "./AssetPopulater";
import { AssetImport } from "./Collections/AssetImport";

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

export type CreateAsset = (
  asset: UnspecifiedAssetDocument,
  goToNextScreen: (id: string | number) => void
) => void;

export type UpdateAsset = (asset: AssetDocument) => void;

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
    CollectionDocument,
    React.Dispatch<CollectionDocument>
  ] = useState(startingCollection);

  const [assetScale, setAssetScale]: [
    AssetScale,
    React.Dispatch<AssetScale>
  ] = useState(startingScale);

  function maybeGetLocalCollections(): CollectionDocument[] {
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

  const handleAssetScaleChange: HandleAssetScaleChange = (newScale) => {
    setAssetScale(newScale);
  };

  function persistCollection(collection) {
    window.localStorage.setItem("collections", JSON.stringify([collection]));
  }

  const updateAsset: UpdateAsset = (asset) => {
    currentCollection.assets[currentAssetIndex] = asset;
    persistCollection(currentCollection);
    setCurrentAsset(cloneDeep(transformToLatest(asset)));
  };

  function askToDelete(history) {
    if (window.confirm("Delete this asset?")) {
      currentCollection.assets.splice(currentAssetIndex, 1);
      persistCollection(currentCollection);
      setCurrentCollection(currentCollection);
      setCurrentAsset(null); // important for not overwriting an asset when pressing back & editing a deleted one
      history.push("/");
    }
  }

  const createAsset: CreateAsset = (asset, goToNextScreen) => {
    const transformedAsset = transformToLatest(asset);
    const index = currentCollection.assets.push(transformedAsset) - 1;
    window.localStorage.setItem(
      "collections",
      JSON.stringify([currentCollection])
    );
    setCurrentAsset(transformedAsset);
    setCurrentAssetIndex(index);
    setCurrentCollection(currentCollection);
    goToNextScreen(index);
  };

  const setCurrentAssetById: SetCurrentAssetById = (index: number) => {
    setCurrentAsset(transformToLatest(currentCollection.assets[index]));
    setCurrentAssetIndex(index);
  };

  return (
    <Router basename="/ironsworn-asset-workbench">
      <div className="app">
        <header className="app-header">
          <h2>
            Asset Workbench <span className="app-version">v0.20.0</span>
          </h2>
        </header>

        <Switch>
          <Route exact path="/">
            <AssetSelection
              assets={currentCollection.assets}
              setCurrentAsset={setCurrentAsset}
              setCurrentAssetIndex={setCurrentAssetIndex}
            ></AssetSelection>
          </Route>

          <Route path="/assets/new">
            <AssetCreation createAsset={createAsset}></AssetCreation>
          </Route>

          <Route path="/assets/import">
            <AssetImport createAsset={createAsset}></AssetImport>
          </Route>

          <Route path="/assets/:assetId/preview">
            <AssetPopulater
              asset={currentAsset}
              setCurrentAssetById={setCurrentAssetById}
            >
              <ExportAsset
                asset={currentAsset}
                scale={assetScale}
                index={currentAssetIndex}
                preview={true}
              ></ExportAsset>
            </AssetPopulater>
          </Route>

          <Route path="/assets/:assetId/download">
            <AssetPopulater
              asset={currentAsset}
              setCurrentAssetById={setCurrentAssetById}
            >
              <ExportAsset
                asset={currentAsset}
                scale={assetScale}
                index={currentAssetIndex}
                preview={false}
              ></ExportAsset>
            </AssetPopulater>
          </Route>

          <Route path="/assets/:assetId/edit">
            <AssetPopulater
              asset={currentAsset}
              setCurrentAssetById={setCurrentAssetById}
            >
              <div className="container">
                <AssetEditor
                  currentAsset={currentAsset}
                  currentAssetId={currentAssetIndex}
                  updateAsset={updateAsset}
                  askToDelete={askToDelete}
                  assetScale={assetScale}
                  handleAssetScaleChange={handleAssetScaleChange}
                ></AssetEditor>
              </div>
            </AssetPopulater>
          </Route>

          <Route path="/collections/print">
            <CollectionPrinting
              assets={currentCollection.assets}
            ></CollectionPrinting>
          </Route>
        </Switch>

        <Footer></Footer>
      </div>
    </Router>
  );
}

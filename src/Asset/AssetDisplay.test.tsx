import React from "react";
import { AssetDisplay } from "./AssetDisplay";
import renderer from "react-test-renderer";
import { lightbearer, caveLion, ironclad } from "./exampleAssets";
import { transformToLatest } from "./assetTransformation";

[lightbearer, caveLion, ironclad].forEach((asset) => {
  it("renders the asset " + asset.name, () => {
    const assetAsLatestVersion = transformToLatest(asset);

    const tree = renderer
      .create(
        <AssetDisplay asset={assetAsLatestVersion} scale="full"></AssetDisplay>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

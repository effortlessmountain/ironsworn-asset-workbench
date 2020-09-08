import React from "react";
import { AssetDisplay } from "./AssetDisplay";
import renderer from "react-test-renderer";
import { lightbearer, caveLion, ironclad } from "./exampleAssets";
import { transformToLatest } from "./assetTransformation";

import { render } from "@testing-library/react";

[lightbearer(), caveLion(), ironclad()].forEach((asset) => {
  it("renders the asset " + asset.name, () => {
    const assetInLatestFormat = transformToLatest(asset);

    const tree = renderer
      .create(
        <AssetDisplay asset={assetInLatestFormat} scale="full"></AssetDisplay>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("tags in description", () => {
  it("displays em tags", () => {
    const asset = caveLion();
    asset.description = "A description with <em>Some italicized text</em> here";
    const assetInLatestFormat = transformToLatest(asset);

    const { getByText } = render(
      <AssetDisplay asset={assetInLatestFormat} scale="full"></AssetDisplay>
    );
    const result = getByText((el) => el.includes("A description with"))
      .innerHTML;

    expect(result).toBe(
      `A description with <em>Some italicized text</em> here`
    );
  });

  it("doesn't allow other tags", () => {
    const asset = caveLion();
    asset.description = `A description with <em><h1>Some italicized text</h1><img src="foo"/></em> here`;
    const assetInLatestFormat = transformToLatest(asset);

    const { getByText } = render(
      <AssetDisplay asset={assetInLatestFormat} scale="full"></AssetDisplay>
    );
    const result = getByText((el) => el.includes("A description with"))
      .innerHTML;

    expect(result).toBe(
      `A description with <em>Some italicized text</em> here`
    );
  });
});

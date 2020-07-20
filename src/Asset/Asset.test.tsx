import React from 'react'
import { Asset } from './Asset'
import renderer from 'react-test-renderer'
import { lightbearer, caveLion, ironclad } from '../exampleAssets'
import { transformToLatest } from '../models/assetTransformation'

[lightbearer, caveLion, ironclad].forEach((asset) => {
    it("renders the asset " + asset.name, () => {
        const assetAsLatestVersion = transformToLatest(asset)

        const tree = renderer
            .create(<Asset asset={assetAsLatestVersion} scale="full"></Asset>)
            .toJSON();

        expect(tree).toMatchSnapshot()
    })
})
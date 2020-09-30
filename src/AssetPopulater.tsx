import React, { ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AssetDocument } from "./Asset/asset";

export type SetCurrentAssetById = (index: number) => void;

interface AssetPopulaterProps {
  asset: AssetDocument;
  setCurrentAssetById: SetCurrentAssetById;
  children: ReactNode;
}
export function AssetPopulater(props: AssetPopulaterProps) {
  const params: any = useParams();
  useEffect(() => {
    if (!props.asset) {
      props.setCurrentAssetById(params.assetId);
    }
  });

  if (!props.asset) {
    return null;
  }
  return <>{props.children}</>;
}

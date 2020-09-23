import React, { ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AssetDocument } from "./Asset/asset";

interface AssetPopulaterProps {
  asset: AssetDocument;
  setCurrentAssetById(index);
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

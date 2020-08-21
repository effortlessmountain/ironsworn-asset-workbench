import React from "react";

export default function AssetCardButton(props: {
  text: string;
  handleClick();
}) {
  return (
    <div className="asset-choice" onClick={props.handleClick}>
      <div className="add-new-asset asset one-third">
        <div className="add-new-asset-text">{props.text}</div>
      </div>
    </div>
  );
}

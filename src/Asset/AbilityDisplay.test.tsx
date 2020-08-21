import React from "react";
import { AbilityDisplay } from "./AssetDisplay";
import renderer from "react-test-renderer";

function getDangerousHTML(tree) {
  return tree.children[1].children[1].props.dangerouslySetInnerHTML.__html;
}

describe("sanitizing html input", () => {
  it("sanitizes html input", () => {
    const ability = {
      name: "update",
      filled: true,
      text: `<img src="dangerous place">some text here`,
    };

    const tree = renderer
      .create(<AbilityDisplay ability={ability}></AbilityDisplay>)
      .toJSON();

    expect(getDangerousHTML(tree)).toBe("some text here");
  });
});

import React from "react";
import { AssetDocument, Ability } from "../../Asset/asset";
import {
  LabeledTextInput,
  LabeledCheckBox,
  LabeledTextAreaInput,
} from "../LabeledInputs";

function AbilityInput(props: {
  ability: Ability;
  updateAbility(value): void;
  removeAbility(ability): void;
}) {
  return (
    <div className="ability-input">
      <div className="ability-input-top">
        <div className="ability-input-top-fields">
          <LabeledTextInput
            label="Name (optional)"
            id="ability-name-input"
            value={props.ability.name || ""}
            handleChange={(e) => {
              props.ability.name = e.currentTarget.value;
              props.updateAbility(props.ability);
            }}
          ></LabeledTextInput>
          <LabeledCheckBox
            label="Filled"
            className="ability-filled-input"
            value={props.ability.filled || false}
            handleChange={(e) => {
              props.ability.filled = !props.ability.filled;
              props.updateAbility(props.ability);
            }}
          ></LabeledCheckBox>
        </div>
        <button
          className="ability-button remove-ability"
          onClick={() => props.removeAbility(props.ability)}
        >
          remove
        </button>
      </div>
      <LabeledTextAreaInput
        label="Ability Text"
        className="ability-text-input"
        value={props.ability.text || ""}
        handleChange={(e) => {
          props.ability.text = e.currentTarget.value;
          props.updateAbility(props.ability);
        }}
      ></LabeledTextAreaInput>
    </div>
  );
}

type AbilitiesEditProps = {
  currentAsset: AssetDocument;
  updateAsset(asset): void;
};

export function AbilitiesEdit(props: AbilitiesEditProps) {
  function updateAbility(ability, index) {
    props.currentAsset.abilities[index] = ability;
    props.updateAsset(props.currentAsset);
  }
  function removeAbility(index) {
    props.currentAsset.abilities.splice(index, 1);
    props.updateAsset(props.currentAsset);
  }
  function addAbility() {
    props.currentAsset.abilities.push({
      filled: false,
      name: "",
      text: "",
    });
    props.updateAsset(props.currentAsset);
  }
  return (
    <div className="editor-view">
      <div className="vertical">
        {props.currentAsset.abilities.map((ability, index) => {
          return (
            <AbilityInput
              key={index}
              ability={ability}
              updateAbility={(changed) => updateAbility(changed, index)}
              removeAbility={() => removeAbility(index)}
            ></AbilityInput>
          );
        })}
        <button className="ability-button" onClick={() => addAbility()}>
          Add
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { AssetDocument, Ability } from '../../../models/assetModels';
import { LabeledTextInput, LabeledCheckBox, LabeledTextAreaInput } from '../../LabeledInputs';

type AbilitiesViewProps = {
    currentAsset: AssetDocument;
    updateAsset(asset): void;
};

function AbilityInput(props: {
    ability: Ability,
    updateAbility(value): void,
    removeAbility(ability): void
}) {
    return (
        <div className="ability-input">
            <div className="ability-input-top">
                <div className="ability-input-top-fields">
                    <LabeledTextInput label="Name (optional)" id="ability-name-input" value={props.ability.name || ""} handleChange={(e) => {
                        props.ability.name = e.currentTarget.value
                        props.updateAbility(props.ability)
                    }}></LabeledTextInput>
                    <LabeledCheckBox label="Filled" className="ability-filled-input" value={props.ability.filled || false} handleChange={(e) => {
                        props.ability.filled = !props.ability.filled
                        props.updateAbility(props.ability)
                    }}></LabeledCheckBox>
                </div>
                <button className="ability-button remove-ability" onClick={() => props.removeAbility(props.ability)}>remove</button>
            </div>
            <LabeledTextAreaInput label="Ability Text" className="ability-text-input" value={props.ability.text || ""} handleChange={(e) => {
                props.ability.text = e.currentTarget.value
                props.updateAbility(props.ability)
            }}></LabeledTextAreaInput>
        </div>
    )
}
export class AbilitiesView extends React.Component<AbilitiesViewProps> {
    updateAbility(ability, index) {
        this.props.currentAsset.abilities[index] = ability;
        this.props.updateAsset(this.props.currentAsset);
    }
    removeAbility(index) {
        this.props.currentAsset.abilities.splice(index, 1);
        this.props.updateAsset(this.props.currentAsset);
    }
    addAbility() {
        this.props.currentAsset.abilities.push({
            filled: false,
            name: "",
            text: ""
        });
        this.props.updateAsset(this.props.currentAsset);
    }
    render() {
        return (<div className="editor-view">
            <div className="vertical">
                {this.props.currentAsset.abilities.map((ability, index) => {
                    return <AbilityInput key={index} ability={ability} updateAbility={(changed) => this.updateAbility(changed, index)} removeAbility={() => this.removeAbility(index)}></AbilityInput>;
                })}
                <button className="ability-button" onClick={() => this.addAbility()}>Add</button>
            </div>
        </div>);
    }
}

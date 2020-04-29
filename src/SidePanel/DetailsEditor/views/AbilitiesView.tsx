import React from 'react';
import { AssetDocument, Ability } from '../../../models/models';
import { LabeledTextInput, LabeledCheckBox, LabeledTextAreaInput } from '../../LabeledTextInput';

type AbilitiesViewProps = {
    currentAsset: AssetDocument;
    setCurrentAsset(asset): void;
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
                    <LabeledTextInput label="Name (optional)" value={props.ability.name || ""} handleChange={(e) => {
                        props.ability.name = e.currentTarget.value
                        props.updateAbility(props.ability)
                    }}></LabeledTextInput>
                    <LabeledCheckBox label="Filled" value={props.ability.filled || false} handleChange={(e) => {
                        props.ability.filled = !props.ability.filled
                        props.updateAbility(props.ability)
                    }}></LabeledCheckBox>
                </div>
                <button className="ability-button" onClick={() => props.removeAbility(props.ability)}>remove</button>
            </div>
            <LabeledTextAreaInput label="Ability Text" value={props.ability.text || ""} handleChange={(e) => {
                props.ability.text = e.currentTarget.value
                props.updateAbility(props.ability)
            }}></LabeledTextAreaInput>
        </div>
    )
}
export class AbilitiesView extends React.Component<AbilitiesViewProps> {
    updateAbility(ability, index) {
        this.props.currentAsset.abilities[index] = ability;
        this.props.setCurrentAsset(this.props.currentAsset);
    }
    removeAbility(index) {
        this.props.currentAsset.abilities.splice(index, 1);
        this.props.setCurrentAsset(this.props.currentAsset);
    }
    addAbility() {
        this.props.currentAsset.abilities.push({
            filled: false,
            name: "",
            text: ""
        });
        this.props.setCurrentAsset(this.props.currentAsset);
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

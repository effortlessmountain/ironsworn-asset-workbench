import React from 'react';

export function LabeledTextInput(props: {
    label: string;
    value: string;
    handleChange(e): void;
}) {
    return (
        <div className="text-input">
            <label>{props.label}</label>
            <input type="text" value={props.value} onChange={props.handleChange}></input>
        </div>
    );
}

export function LabeledTextAreaInput(props: {
    label: string;
    value: string;
    handleChange(e): void;
}) {
    return (
        <div className="text-input">
            <label>{props.label}</label>
            <textarea value={props.value} onChange={props.handleChange}></textarea>
        </div>
    );
}

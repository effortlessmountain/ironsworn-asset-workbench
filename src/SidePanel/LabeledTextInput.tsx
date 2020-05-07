import React from 'react';

export function LabeledTextInput(props: {
    label: string,
    value: string,
    className: string,
    handleChange(e): void
}) {
    return (
        <div className="text-input">
            <label>{props.label}</label>
            <input type="text" className={props.className} value={props.value} onChange={props.handleChange}></input>
        </div>
    );
}

export function LabeledTextAreaInput(props: {
    label: string,
    value: string,
    className: string,
    handleChange(e): void
}) {
    return (
        <div className="text-input">
            <label>{props.label}</label>
            <textarea className={props.className} value={props.value} onChange={props.handleChange}></textarea>
        </div>
    );
}

export function LabeledCheckBox(props: {
    label: string,
    value: boolean,
    handleChange(e): void
}) {
    return (
        <div className="checkbox-input">
            <label>{props.label}</label>
            <input type="checkbox" checked={props.value} onChange={props.handleChange}></input>
        </div>
    )
}
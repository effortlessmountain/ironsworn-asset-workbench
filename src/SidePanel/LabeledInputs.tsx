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
    className: string,
    handleChange(e): void
}) {
    return (
        <div className="checkbox-input">
            <label>{props.label}</label>
            <input type="checkbox" className={props.className} checked={props.value} onChange={props.handleChange}></input>
        </div>
    )
}

export function LabeledNumberInput(props: {
    label: string,
    value: number,
    step: string,
    id: string,
    handleChange(value: number)
}) {

    const MAX = 100;

    //number inputs have lots of quirks. Definitely incentive to use a component library.
    const makeHandleChange = (handleChange: (value: number) => void) => {
        return (e) => {
            let value = +e.currentTarget.value
            if (value > MAX) {
                value = MAX
            }
            handleChange(value)
        }
    }

    console.log("value is ", props.value)

    return (<div className="number-input">
        <label>{props.label}</label>
        <input type="number"
            id={props.id}
            // displaying a non-deletable zero that pads the left is wonky, so '' is preferable here
            value={+props.value || ''}
            step={props.step}
            min="0"
            max={MAX}
            onChange={makeHandleChange(props.handleChange)}></input>
    </div>);
}
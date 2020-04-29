import React from 'react';
import { LabeledTextInput, LabeledTextAreaInput } from '../../LabeledTextInput';
import { AssetDocument } from '../../../models/models';

type TopViewProps = {
    currentAsset: AssetDocument;
    setCurrentAsset(asset): void;
    handleIconImport(): void; //todo: move fully inte here
};

export class TopView extends React.Component<TopViewProps> {
    render() {
        return (<div className="editor-view misc-editor-view">
            <div className="vertical">
                <LabeledTextInput label="Asset Name" value={this.props.currentAsset.name} handleChange={(e) => {
                    this.props.currentAsset.name = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextInput>
                <LabeledTextInput label="Type" value={this.props.currentAsset.type} handleChange={(e) => {
                    this.props.currentAsset.type = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextInput>
                <LabeledTextInput label="Write-in (optional)" value={this.props.currentAsset.writeIn || ""} handleChange={(e) => {
                    this.props.currentAsset.writeIn = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextInput>
                <LabeledTextAreaInput label="Description (optional)" value={this.props.currentAsset.description} handleChange={(e) => {
                    this.props.currentAsset.description = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextAreaInput>
            </div>
            <div className="icon-import">
                <div>
                    <p className="icon-import-helptext">Import an icon in SVG format here with a transparent background. Click the "How do I...?" button for instructions on getting an icon from Game-Icons.net.</p>
                    <div className="icon-import-fileselect">
                        <label htmlFor="icon-fileselect">Icon to import</label>
                        <input type="file" id="icon-fileselect" />
                    </div>
                    <div className="icon-import-author">
                        <label htmlFor="icon-author">Icon Artist</label>
                        <input type="text" id="icon-author" />
                    </div>
                    <button id="icon-import-button" onClick={() => this.props.handleIconImport()}> Import </button>
                </div>
            </div>
        </div>);
    }
}

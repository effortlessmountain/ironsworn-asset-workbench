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
                <LabeledTextInput label="Asset Name" className="asset-name-input" value={this.props.currentAsset.name} handleChange={(e) => {
                    this.props.currentAsset.name = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextInput>
                <LabeledTextInput label="Type" className="asset-type-input" value={this.props.currentAsset.type} handleChange={(e) => {
                    this.props.currentAsset.type = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextInput>
                <LabeledTextInput label="Write-in (optional)" className="asset-write-in-input" value={this.props.currentAsset.writeIn || ""} handleChange={(e) => {
                    this.props.currentAsset.writeIn = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextInput>
                <LabeledTextAreaInput label="Description (optional)" className="asset-description-input" value={this.props.currentAsset.description} handleChange={(e) => {
                    this.props.currentAsset.description = e.currentTarget.value;
                    this.props.setCurrentAsset(this.props.currentAsset);
                }}></LabeledTextAreaInput>
            </div>
            <div className="icon-import">
                <div className="icon-import-helptext">
                    <p>SVG icons are supported. Use a transparent background for best results.</p>
                    <ol>
                        <li>Head over to <a href="https://game-icons.net/" target="_blank" rel="noopener noreferrer">GameIcons.net</a>, a wonderful resource of Creative Commons-licensed icons.</li>
                        <li>On the left hand side, with "Studio" set to background, set "Type" to "none" (for a transparent
                background).</li>
                        <li>Download the icon.</li>
                        <li>Click "browse..." under "Icon to import" below here and select the just-downloaded icon.</li>
                        <li>Fill in the artist's name and click "IMPORT".</li>
                    </ol>
                </div>

                <div className="icon-import-controls">
                    <div className="icon-import-fileselect">
                        <label htmlFor="icon-fileselect">Icon to import</label>
                        <input type="file" id="icon-fileselect" />
                    </div>
                    <div className="icon-import-author">
                        <label htmlFor="icon-author">Icon Artist</label>
                        <input type="text" id="icon-author" defaultValue={(this.props.currentAsset.icon || {})['author'] || ""} />
                        {/* todo: standardize icon schema across types */}
                    </div>
                    <button id="icon-import-button" onClick={() => this.props.handleIconImport()}> Import </button>
                </div>
            </div>
        </div >);
    }
}

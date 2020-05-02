import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType,
    PropertyPaneToggle
} from '@microsoft/sp-property-pane';

import { IPropertyPaneFilePickerProps } from './IPropertyPaneFilePickerProps';
import { IPropertyPaneFilePickerInternalProps } from './IPropertyPaneFilePickerInternalProps';

import { FilePicker, IFilePickerProps, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

export class PropertyPaneFilePickerBuilder implements IPropertyPaneField<IPropertyPaneFilePickerProps> {

    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneFilePickerInternalProps;

    private elem: HTMLElement;

    public constructor(targetProperty: string, properties: IPropertyPaneFilePickerProps) {

        this.targetProperty = targetProperty;
        
        this.properties = {
            webpartContext: properties.webpartContext,
            onRender: this.onRender.bind(this),
            key: "test1234",
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            disabled: properties.disabled,
            accepts : properties.accepts
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }

    private onDispose(element: HTMLElement): void {
        ReactDom.unmountComponentAtNode(element);
    }

    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<IFilePickerProps> = React.createElement(FilePicker, {
            onSave: this.onSave.bind(this),
            context: this.properties.webpartContext,
            buttonLabel: this.properties.label,
            accepts: this.properties.accepts, 
            disabled : this.properties.disabled ? this.properties.disabled : false
        });

        ReactDom.render(element, elem);
    }

    private onSave(filePickerResult: IFilePickerResult) : void {

        this.properties.onPropertyChange(filePickerResult);
        
      }
}

export function PropertyPaneFilePicker(targetProperty : string, properties: IPropertyPaneFilePickerProps) : IPropertyPaneField<IPropertyPaneFilePickerProps>{

    return new PropertyPaneFilePickerBuilder(targetProperty, properties);
    
}
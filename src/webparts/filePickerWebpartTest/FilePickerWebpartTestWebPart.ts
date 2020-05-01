import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FilePickerWebpartTestWebPartStrings';

import {IFilePickerWebpartTestProps} from './components/IFilePickerWebpartTestProps';
import FilePickerWebpartTest from './components/FilePickerWebpartTest';

import {PropertyPaneFilePicker}  from '../../controls/PropertyPaneFilePicker/PropertyPaneFilePicker'

import {IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

import { update, get } from '@microsoft/sp-lodash-subset';



export interface IFilePickerWebpartTestWebPartProps {
  description: string;
}

export default class FilePickerWebpartTestWebPart extends BaseClientSideWebPart <IFilePickerWebpartTestWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFilePickerWebpartTestProps> = React.createElement(
      FilePickerWebpartTest,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneFilePicker('description', {
                  key: "filepicker1",
                  label: strings.DescriptionFieldLabel,
                  webpartContext: this.context,
                  onPropertyChange: this.onFileChange.bind(this), 
                  accepts : [".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private onFileChange(filePickerResult: IFilePickerResult) {
    
    update(this.properties, "description", (): any => { return filePickerResult.fileAbsoluteUrl; });
    // refresh web part
    this.render();

  }
}

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';


export interface IPropertyPaneFilePickerProps {
  key: string;
  label: string;
  onPropertyChange: (filePickerResult: IFilePickerResult) => void;
  disabled?: boolean;
  webpartContext : WebPartContext;
}
# spfx-propertypane-filepicker

A file picker for SPFX webparts property panes

Still in development.

### Imports


```javascript

import {PropertyPaneFilePicker}  from 'spfx-propertypane-filepicker';

import {IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

import { update, get } from '@microsoft/sp-lodash-subset';
```

### Code


```javascript
                PropertyPaneFilePicker('description', {
                  key: "filepicker1",
                  label: strings.DescriptionFieldLabel,
                  webpartContext: this.context,
                  onPropertyChange: this.onFileChange.bind(this), 
                  accepts : [".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]
                })

```

### Handler

```javascript
  private onFileChange(filePickerResult: IFilePickerResult) {
    
    update(this.properties, "description", (): any => { return filePickerResult.fileAbsoluteUrl; });
    // refresh web part
    this.render();

  }

```
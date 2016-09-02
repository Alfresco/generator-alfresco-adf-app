<%- licenseHeader %>
import { Component } from '@angular/core';
import { AlfrescoContentService } from 'ng2-alfresco-core';
import { ALFRESCO_SEARCH_DIRECTIVES } from 'ng2-alfresco-search';
import { VIEWERCOMPONENT } from 'ng2-alfresco-viewer';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'search-component',
  templateUrl: './search.component.html',
  styles: [`
        :host div.search-results-container {
            padding: 0 20px 20px 20px;
        }
        :host h1 {
            font-size: 22px;
        }
        :host tbody tr {
            cursor: pointer;
        }
    `],
  directives: [ ALFRESCO_SEARCH_DIRECTIVES, VIEWERCOMPONENT ]
})
export class SearchComponent {

  previewContentUrl: string;
  previewName: string;
  previewMimeType: string;
  previewActive: boolean = false;

  constructor(public contentService: AlfrescoContentService) {
  }

  onFileClicked(event) {
    if (event.value.entry.isFile) {
      this.previewName = event.value.entry.name;
      this.previewMimeType = event.value.entry.content.mimeType;
      this.previewContentUrl = this.contentService.getContentUrl(event.value);
      this.previewActive = true;
    }
  }
}

<%- licenseHeader %>
import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { ALFRESCO_SEARCH_DIRECTIVES } from 'ng2-alfresco-search';
import { VIEWERCOMPONENT } from 'ng2-alfresco-viewer';
import {
  AlfrescoAuthenticationService,
  AlfrescoContentService
} from 'ng2-alfresco-core';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styles: [`
    `],
  directives: [ ALFRESCO_SEARCH_DIRECTIVES, VIEWERCOMPONENT ]
})
export class SearchBarComponent {

  urlFile: string;
  fileName: string;
  mimeType: string;
  fileShowed: boolean = false;

  constructor(
    public router: Router,
    public auth: AlfrescoAuthenticationService,
    public contentService: AlfrescoContentService

  ) {
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  /**
   * Called when a new search term is submitted
   *
   * @param params Parameters relating to the search
   */
  searchTermChange(params) {
    this.router.navigate(['Search', {
      q: params.value
    }]);
  }

  onFileClicked(event) {
    if (event.value.entry.isFile) {
      this.fileName = event.value.entry.name;
      this.mimeType = event.value.entry.content.mimeType;
      this.urlFile = this.contentService.getContentUrl(event.value);
      this.fileShowed = true;
    }
  }
}

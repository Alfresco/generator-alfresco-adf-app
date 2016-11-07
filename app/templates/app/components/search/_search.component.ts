<%- licenseHeader %>
import { Component } from '@angular/core';

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
    `]
})
export class SearchComponent {

  fileShowed: boolean = false;
  fileNodeId: string;

  onFileClicked(event) {
      if (event.value.entry.isFile) {
          this.fileNodeId = event.value.entry.id;
          this.fileShowed = true;
      }
  }
}

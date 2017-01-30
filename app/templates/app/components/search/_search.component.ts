<%- licenseHeader %>

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MinimalNodeEntity } from 'alfresco-js-api';

@Component({
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
        @media screen and (max-width: 600px) {
            :host .col-display-name {
                min-width: 100px;
            }
            :host .col-modified-at, :host .col-modified-by {
                display: none;
            }
            :host div.search-results-container table {
                width: 100%;
            }
        }
    `]
})
export class SearchComponent {

  fileNodeId: string;
  fileShowed: boolean = false;

  constructor(public router: Router) {
  }

  showFile(event) {
    if (event.value.entry.isFile) {
      this.fileNodeId = event.value.entry.id;
      this.fileShowed = true;
    } else {
      this.fileShowed = false;
    }
  }
}

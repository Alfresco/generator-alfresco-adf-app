<%- licenseHeader %>

import { Component } from '@angular/core';

@Component({
    selector: 'adf-create-folder-dialog',
    template: `
        <h1 md-dialog-title>Create a new folder</h1>
        <div md-dialog-content>
            <md-input-container class="create-folder--name">
                <input mdInput placeholder="Folder name" [(ngModel)]="value">
            </md-input-container>
        </div>
        <div md-dialog-actions>
            <button md-button md-dialog-close>Cancel</button>
            <button md-button [md-dialog-close]="value">Create</button>
        </div>
    `,
    styles: [
        `
        .create-folder--name {
            width: 100%;
        }
        `
    ]
})
export class CreateFolderDialogComponent {
    value: string = '';
}

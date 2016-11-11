<%- licenseHeader %>
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'search-bar',
    templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

    fileNodeId: string;
    fileShowed: boolean = false;
    searchTerm: string = '';

    @Output()
    expand = new EventEmitter();

    constructor(public router: Router,
                public auth: AlfrescoAuthenticationService) {
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    /**
     * Called when the user submits the search, e.g. hits enter or clicks submit
     *
     * @param event Parameters relating to the search
     */
    onSearchSubmit(event) {
        this.router.navigate(['/search', {
            q: event.value
        }]);
    }

    onFileClicked(event) {
        if (event.value.entry.isFile) {
            this.fileNodeId = event.value.entry.id;
            this.fileShowed = true;
        }
    }

    onSearchTermChange(event) {
        this.searchTerm = event.value;
    }

    onExpandToggle(event) {
        this.expand.emit(event);
    }
}

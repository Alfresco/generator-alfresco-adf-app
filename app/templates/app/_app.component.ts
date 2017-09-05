<%- licenseHeader %>

import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
    AlfrescoAuthenticationService,
    AlfrescoSettingsService,
    AlfrescoTranslationService,
    LogService,
    StorageService
} from 'ng2-alfresco-core';

declare var document: any;

@Component({
    selector: 'adf-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', './theme.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  <% if (searchBar == true) { %> searchTerm: string = '';<% } %>

    constructor(private authService: AlfrescoAuthenticationService,
                private router: Router,
                private settingsService: AlfrescoSettingsService,
                private translateService: AlfrescoTranslationService,
                private storage: StorageService,
                private logService: LogService) {
        this.setProvider();
    }

    isAPageWithHeaderBar(): boolean {
        return location.pathname === '/login' || location.pathname === '/settings';
    }

    onLogout(event) {
        event.preventDefault();
        this.authService.logout()
            .subscribe(
                () => {
                    this.navigateToLogin();
                },
                (error: any) => {
                    if (error && error.response && error.response.status === 401) {
                        this.navigateToLogin();
                    } else {
                        this.logService.error('An unknown error occurred while logging out', error);
                        this.navigateToLogin();
                    }
                }
            );
    }

    navigateToLogin() {
        this.router.navigate(['/login']);
    }
  <% if (searchBar == true) { %>
  onToggleSearch(event) {
    let expandedHeaderClass = 'header-search-expanded',
      header = document.querySelector('header');
    if (event.expanded) {
      header.classList.add(expandedHeaderClass);
    } else {
      header.classList.remove(expandedHeaderClass);
    }
  }
  <% } %>
    changeLanguage(lang: string) {
        this.translateService.use(lang);
    }

    private setProvider() {
        if (this.storage.hasItem(`providers`)) {
            this.settingsService.setProviders(this.storage.getItem(`providers`));
        }
    }
}

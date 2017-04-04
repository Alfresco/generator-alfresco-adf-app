<%- licenseHeader %>

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlfrescoTranslationService, AlfrescoAuthenticationService, AlfrescoSettingsService, StorageService, LogService } from 'ng2-alfresco-core';

declare var document: any;

@Component({
    selector: 'alfresco-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  <% if (searchBar == true) { %> searchTerm: string = '';<% } %>

  ecmHost: string = '<%= alfrescoServerHost %>';
  bpmHost: string = '<%= activitiServerHost %>';

    constructor(private authService: AlfrescoAuthenticationService,
                private router: Router,
                private settingsService: AlfrescoSettingsService,
                private translateService: AlfrescoTranslationService,
                private storage: StorageService,
                private logService: LogService) {
        this.setEcmHost();
        this.setBpmHost();
        this.setProvider();

        if (translateService) {
            translateService.addTranslationFolder('app', 'resources');
        }
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
        this.hideDrawer();
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
        this.hideDrawer();
    }

    hideDrawer() {
        // todo: workaround for drawer closing
        document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
    }

    private setEcmHost() {
        if (this.storage.hasItem(`ecmHost`)) {
            this.settingsService.ecmHost = this.storage.getItem(`ecmHost`);
            this.ecmHost = this.storage.getItem(`ecmHost`);
        } else {
            this.settingsService.ecmHost = this.ecmHost;
        }
    }

    private setBpmHost() {
        if (this.storage.hasItem(`bpmHost`)) {
            this.settingsService.bpmHost = this.storage.getItem(`bpmHost`);
            this.bpmHost = this.storage.getItem(`bpmHost`);
        } else {
            this.settingsService.bpmHost = this.bpmHost;
        }
    }

    private setProvider() {
        if (this.storage.hasItem(`providers`)) {
            this.settingsService.setProviders(this.storage.getItem(`providers`));
        }
    }
}

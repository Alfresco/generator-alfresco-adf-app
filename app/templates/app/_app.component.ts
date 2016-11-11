<%- licenseHeader %>
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  AlfrescoTranslationService,
  AlfrescoAuthenticationService,
  AlfrescoSettingsService
} from 'ng2-alfresco-core';

declare var document: any;

@Component({
  selector: 'alfresco-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent {
  <% if (searchBar == true) { %> searchTerm: string = '';<% } %>

  ecmHost: string = '<%= alfrescoServerHost %>';
  bpmHost: string = '<%= activitiServerHost %>';

  constructor(public auth: AlfrescoAuthenticationService,
              public router: Router,
              private translate: AlfrescoTranslationService,
              public alfrescoSettingsService: AlfrescoSettingsService) {
    this.setEcmHost();
    this.setBpmHost();
    this.setProvider();

    if (translate) {
        translate.addTranslationFolder();
    }
  }

  isLoggedIn(): boolean {
      this.redirectToLoginPageIfNotLoggedIn();
      return this.auth.isLoggedIn();
  }

  redirectToLoginPageIfNotLoggedIn(): void {
      if (!this.isLoginPage() && !this.auth.isLoggedIn()) {
          this.router.navigate(['/login']);
      }
  }

  isLoginPage(): boolean {
      return location.pathname === '/login' || location.pathname === '/' || location.pathname === '/settings';
  }

  onLogout(event) {
      event.preventDefault();
      this.auth.logout()
          .subscribe(
              () => {
                  this.router.navigate(['/login']);
              },
              ($event: any) => {
                  if ($event && $event.response && $event.response.status === 401) {
                      this.router.navigate(['/login']);
                  } else {
                      console.error('An unknown error occurred while logging out', $event);
                  }
              }
          );
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
    this.translate.use(lang);
  }

  hideDrawer() {
    // todo: workaround for drawer closing
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
  }

  private setEcmHost() {
    if (localStorage.getItem(`ecmHost`)) {
      this.alfrescoSettingsService.ecmHost = localStorage.getItem(`ecmHost`);
      this.ecmHost = localStorage.getItem(`ecmHost`);
    } else {
      this.alfrescoSettingsService.ecmHost = this.ecmHost;
    }
  }

  private setBpmHost() {
    if (localStorage.getItem(`bpmHost`)) {
      this.alfrescoSettingsService.bpmHost = localStorage.getItem(`bpmHost`);
      this.bpmHost = localStorage.getItem(`bpmHost`);
    } else {
      this.alfrescoSettingsService.bpmHost = this.bpmHost;
    }
  }

  private setProvider() {
      if (localStorage.getItem(`providers`)) {
        this.alfrescoSettingsService.setProviders(localStorage.getItem(`providers`));
      }
  }
}

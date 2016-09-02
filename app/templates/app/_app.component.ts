<%- licenseHeader %>
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import {
  MDL,
  AlfrescoSettingsService,
  AlfrescoTranslationService,
  AlfrescoPipeTranslate,
  AlfrescoAuthenticationService
} from 'ng2-alfresco-core';
<% if (searchBar == true) { %>
import { SearchBarComponent } from './components/index';
<% } %>
declare var document: any;

@Component({
  selector: 'alfresco-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [<% if (searchBar == true) { %>SearchBarComponent,<% } %> ROUTER_DIRECTIVES, MDL],
  pipes: [AlfrescoPipeTranslate]
})
export class AppComponent {
  translate: AlfrescoTranslationService;
  <% if (searchBar == true) { %> searchTerm: string = '';<% } %>

  ecmHost: string = '<%= alfrescoServerHost %>';
  bpmHost: string = '<%= activitiServerHost %>';

  constructor(public auth: AlfrescoAuthenticationService,
              public router: Router,
              translate: AlfrescoTranslationService,
              public alfrescoSettingsService: AlfrescoSettingsService) {
    this.setEcmHost();
    this.setBpmHost();

    this.translate = translate;
    this.translate.addTranslationFolder();
  }

  public onChangeECMHost(event: KeyboardEvent): void {
    console.log((<HTMLInputElement>event.target).value);
    this.ecmHost = (<HTMLInputElement>event.target).value;
    this.alfrescoSettingsService.ecmHost = this.ecmHost;
    localStorage.setItem(`ecmHost`, this.ecmHost);
  }

  public onChangeBPMHost(event: KeyboardEvent): void {
    console.log((<HTMLInputElement>event.target).value);
    this.bpmHost = (<HTMLInputElement>event.target).value;
    this.alfrescoSettingsService.bpmHost = this.bpmHost;
    localStorage.setItem(`bpmHost`, this.bpmHost);
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  onLogout(event) {
    event.preventDefault();
    this.auth.logout()
      .subscribe(
        () => this.router.navigate(['/login'])
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
}

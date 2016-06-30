import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { ALFRESCO_CORE_PROVIDERS } from 'ng2-alfresco-core';
<% if (searchBar == true) { %>import { ALFRESCO_SEARCH_PROVIDERS } from 'ng2-alfresco-search';<% } %>
<% if (contentPage == true) { %>import { UploadService } from 'ng2-alfresco-upload';<% } %>

bootstrap(AppComponent, [
  <% if (contentPage == true) { %>UploadService,<% } %>
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  <% if (searchBar == true) { %>ALFRESCO_SEARCH_PROVIDERS,<% } %>
  ALFRESCO_CORE_PROVIDERS
]);


<%- licenseHeader %>
import { provideRouter, RouterConfig } from '@angular/router';

import {
<% if (searchBar == true) { %> SearchComponent,<% } %>
<% if (contentPage == true) { %> FilesComponent,<% } %>
<% if (bpmTaskPage == true) { %> ActivitiDemoComponent,<% } %>
<% if (chartPage == true) { %> ChartComponent,<% } %>
    LoginDemoComponent
} from './components/index';

export const routes: RouterConfig = [
  <% if (contentPage == true) { %>{ path: 'home', component: FilesComponent },<% } %>
  <% if (searchBar == true) { %>{ path: 'search', component: SearchComponent },<% } %>
  <% if (contentPage == true) { %>{ path: 'files', component: FilesComponent },<% } %>
  <% if (bpmTaskPage == true) { %>{ path: 'activiti', component: ActivitiDemoComponent },<% } %>
  <% if (chartPage == true) { %>{ path: 'chart', component: ChartComponent },<% } %>
    { path: '', component: LoginDemoComponent },
    { path: 'login', component: LoginDemoComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];

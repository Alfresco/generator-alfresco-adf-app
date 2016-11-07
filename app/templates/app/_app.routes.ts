<%- licenseHeader %>
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
<% if (searchBar == true) { %> SearchComponent,<% } %>
<% if (contentPage == true) { %> FilesComponent,<% } %>
<% if (bpmTaskPage == true) { %> ActivitiDemoComponent,<% } %>
    LoginDemoComponent
} from './components/index';

export const appRoutes: Routes = [
  <% if (contentPage == true) { %>
    { path: 'home', component: FilesComponent },
    { path: 'files', component: FilesComponent },
  <% } %>
  <% if (searchBar == true) { %>
    { path: 'search', component: SearchComponent },
  <% } %>
  <% if (contentPage == true) { %>
    { path: 'files', component: FilesComponent },
  <% } %>
  <% if (bpmTaskPage == true) { %>
    { path: 'activiti', component: ActivitiDemoComponent },
  <% } %>
    { path: '', component: LoginDemoComponent },
    { path: 'login', component: LoginDemoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

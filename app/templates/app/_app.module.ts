<%- licenseHeader %>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from 'ng2-alfresco-core';
<% if (searchBar == true) { %>
import { SearchModule } from 'ng2-alfresco-search';
<% } %>
<% if (contentPage == true) { %>
import { DataTableModule } from 'ng2-alfresco-datatable';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { UploadModule } from 'ng2-alfresco-upload';
<% } %>
<% if (bpmTaskPage == true) { %>
import { ActivitiFormModule } from 'ng2-activiti-form';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
<% } %>
import { LoginModule } from 'ng2-alfresco-login';
import { UserInfoComponentModule } from 'ng2-alfresco-userinfo';
<% if (searchBar == true || contentPage == true) { %>
import { ViewerModule } from 'ng2-alfresco-viewer';
<% } %>
import { AppComponent } from './app.component';
import { routing } from './app.routes';

import {
  <% if (searchBar == true) { %>
    SearchComponent,
    SearchBarComponent,
  <% } %>
  <% if (bpmTaskPage == true) { %>
    ActivitiDemoComponent,
  <% } %>
  <% if (contentPage == true) { %>
    FilesComponent,
  <% } %>
    LoginDemoComponent
} from './components/index';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        CoreModule.forRoot(),
        <% if (searchBar == true) { %>
        SearchModule.forRoot(),
        <% } %>
        <% if (contentPage == true) { %>
        DataTableModule,
        DocumentListModule.forRoot(),
        UploadModule.forRoot(),
        ViewerModule.forRoot(),
        <% } %>
        <% if (bpmTaskPage == true) { %>
        ActivitiFormModule.forRoot(),
        ActivitiTaskListModule.forRoot(),
        ActivitiProcessListModule.forRoot(),
        <% } %>
        LoginModule,
        UserInfoComponentModule.forRoot()
    ],
    declarations: [
        AppComponent,
        <% if (searchBar == true) { %>
        SearchBarComponent,
        SearchComponent,
        <% } %>
        <% if (bpmTaskPage == true) { %>
        ActivitiDemoComponent,
        <% } %>
        <% if (contentPage == true) { %>
        FilesComponent,
        <% } %>
        LoginDemoComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

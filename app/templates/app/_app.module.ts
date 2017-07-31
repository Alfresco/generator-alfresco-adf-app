<%- licenseHeader %>

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Editor3DModule } from 'ng2-3d-editor';

import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';

<% if (searchBar == true) { %>import { SearchModule } from 'ng2-alfresco-search';<% } %>
<% if (contentPage == true) { %>import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { CreateFolderDialogComponent } from './dialogs/create-folder.dialog';
import { MaterialModule } from './material.module';
  <% } %>
import { UploadModule } from 'ng2-alfresco-upload';
import { TagModule } from 'ng2-alfresco-tag';
import { ActivitiFormModule } from 'ng2-activiti-form';
<% if (bpmTaskPage == true) { %>
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { AnalyticsModule } from 'ng2-activiti-analytics';
import { DiagramsModule } from 'ng2-activiti-diagrams';
  <% } %>import { LoginModule } from 'ng2-alfresco-login';
import { UserInfoComponentModule } from 'ng2-alfresco-userinfo';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { AppComponent } from './app.component';
import { routing } from './app.routes';

import {
  HomeComponent,
  SettingsComponent,
  FormDemoComponent,
  <% if (searchBar == true) { %>SearchComponent,
  SearchBarComponent,<% } %>
  <% if (bpmTaskPage == true) { %>ActivitiDemoComponent,
  ActivitiTaskAttachmentsComponent,
  ActivitiProcessAttachmentsComponent,
  ActivitiShowDiagramComponent,
  ActivitiAppsViewComponent,
  FormViewerComponent,
  FormNodeViewerComponent,<% } %>
  <% if (contentPage == true) { %>FilesComponent,<% } %>
  AboutComponent,
  LoginDemoComponent
} from './components/index';

let appConfigFile = 'app.config-dev.json';
if (process.env.ENV === 'production') {
  appConfigFile = 'app.config-prod.json';
}

@NgModule({
    imports: [
        BrowserModule,
        routing,
        CoreModule.forRoot({
          appConfigFile: appConfigFile
        }),
        DataTableModule.forRoot(),
        <% if (searchBar == true) { %>SearchModule.forRoot(),<% } %>
        <% if (contentPage == true) { %>
        DocumentListModule.forRoot(),
        MaterialModule,<% } %>
        UploadModule.forRoot(),
        ViewerModule.forRoot(),
        ActivitiFormModule.forRoot(),
        <% if (bpmTaskPage == true) { %>
        ActivitiTaskListModule.forRoot(),
        ActivitiProcessListModule.forRoot(),
        AnalyticsModule.forRoot(),
        DiagramsModule.forRoot(), <% } %>
        LoginModule.forRoot(),
        UserInfoComponentModule.forRoot(),
        Editor3DModule.forRoot(),
        TagModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        <% if (searchBar == true) { %>SearchBarComponent,
        SearchComponent,<% } %>
        <% if (bpmTaskPage == true) { %>ActivitiDemoComponent,
        ActivitiTaskAttachmentsComponent,
        ActivitiProcessAttachmentsComponent,
        ActivitiAppsViewComponent,
        ActivitiShowDiagramComponent
        FormViewerComponent,
        FormNodeViewerComponent,<% } %>
        <% if (contentPage == true) { %>FilesComponent,
        CreateFolderDialogComponent,<% } %>
        AboutComponent,
        LoginDemoComponent,
          SettingsComponent,
        FormDemoComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
<% if (contentPage == true) { %>
    , entryComponents: [
    CreateFolderDialogComponent
    ]
  <% } %>
})
export class AppModule { }

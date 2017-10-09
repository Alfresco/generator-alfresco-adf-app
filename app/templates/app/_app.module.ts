

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Editor3DModule } from 'ng2-3d-editor';

import { AppConfigService, CoreModule, TRANSLATION_PROVIDER } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { DebugAppConfigService } from './services/debug-app-config.service';

import { SearchModule } from 'ng2-alfresco-search';
<% if (contentPage == true) { %>import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { CustomSourcesComponent } from './components/files/custom-sources.component';
<% } %>
import { MaterialModule } from './material.module';
import { UploadModule } from 'ng2-alfresco-upload';
import { TagModule } from 'ng2-alfresco-tag';
import { ActivitiFormModule } from 'ng2-activiti-form';
<% if (bpmTaskPage == true) { %>
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { AnalyticsModule } from 'ng2-activiti-analytics';
import { DiagramsModule } from 'ng2-activiti-diagrams';
import { FormListDemoComponent } from './components/form/form-list-demo.component';
  <% } %>import { LoginModule } from 'ng2-alfresco-login';
import { UserInfoModule } from 'ng2-alfresco-userinfo';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { ThemePickerModule } from './components/theme-picker/theme-picker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

import {
  HomeComponent,
  SettingsComponent,
  FormDemoComponent,
  SearchComponent,
  SearchBarComponent,
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
        CoreModule,
        DataTableModule,
        SearchModule,
        <% if (contentPage == true) { %>
        DocumentListModule,<% } %>
        MaterialModule,
        UploadModule,
        ViewerModule,
        ActivitiFormModule,
        <% if (bpmTaskPage == true) { %>
        ActivitiTaskListModule,
        ActivitiProcessListModule,
        AnalyticsModule,
        DiagramsModule, <% } %>
        LoginModule,
        FlexLayoutModule,
        UserInfoModule,
        Editor3DModule,
        TagModule,
        ThemePickerModule
    ],
    declarations: [
        AppLayoutComponent,
        AppComponent,
        HomeComponent,
        SearchBarComponent,
        SearchComponent,
        <% if (bpmTaskPage == true) { %>ActivitiDemoComponent,
        ActivitiTaskAttachmentsComponent,
        ActivitiProcessAttachmentsComponent,
        ActivitiAppsViewComponent,
        ActivitiShowDiagramComponent
        FormViewerComponent,
        FormListDemoComponent,
        FormNodeViewerComponent,<% } %>
        <% if (contentPage == true) { %>FilesComponent,
        CustomSourcesComponent,<% } %>
        AboutComponent,
        LoginDemoComponent,
          SettingsComponent,
        FormDemoComponent
    ],
    providers: [
      { provide: AppConfigService, useClass: DebugAppConfigService },
      {
        provide: TRANSLATION_PROVIDER,
        multi: true,
        useValue: {
          name: 'app',
          source: 'resources'
        }
      }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

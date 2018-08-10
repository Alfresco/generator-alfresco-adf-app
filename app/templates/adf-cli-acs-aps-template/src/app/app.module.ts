import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule } from '@alfresco/adf-core';
import { FileViewComponent } from './file-view/file-view.component';
import { BlobViewComponent } from './file-view/blob-view.component';
import { PreviewService } from './services/preview.service';

// Custom stencils
import { StencilsModule } from './stencils.module';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { appRoutes } from './app.routes';
import { AppLayoutComponent } from './app-layout/app-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),

    // ADF modules
    CoreModule.forRoot(),
    ContentModule.forRoot(),
    ProcessModule.forRoot(),

    StencilsModule
  ],
  declarations: [
    AppComponent,
    AppsComponent,
    HomeComponent,
    LoginComponent,
    TasksComponent,
    TaskDetailsComponent,
    DocumentlistComponent,
    StartProcessComponent,
    AppLayoutComponent,
    FileViewComponent,
    BlobViewComponent
  ],
  providers: [PreviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }

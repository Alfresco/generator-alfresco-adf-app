import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ADF modules
import { AdfModule } from './adf.module';
import { AuthGuardBpm } from 'ng2-alfresco-core';
import { AuthGuardEcm } from 'ng2-alfresco-core';

// Custom stencils
import { StencilsModule } from './stencils.module';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { StartTaskComponent } from './start-task/start-task.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'apps',
    component: AppsComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'apps/:appId/tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'apps/:appId/tasks/:taskId',
    component: TaskDetailsComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'apps/:appId/start-task',
    component: StartTaskComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'documentlist',
    component: DocumentlistComponent,
    canActivate: [ AuthGuardEcm ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),

    // ADF modules
    AdfModule,

    StencilsModule
  ],
  declarations: [
    AppComponent,
    AppsComponent,
    HomeComponent,
    LoginComponent,
    TasksComponent,
    TaskDetailsComponent,
    StartTaskComponent,
    DocumentlistComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

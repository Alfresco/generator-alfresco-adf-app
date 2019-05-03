/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardBpm, AuthGuardEcm } from '@alfresco/adf-core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FileViewComponent } from './file-view/file-view.component';
import { BlobViewComponent } from './file-view/blob-view.component';

export const appRoutes: Routes = [
  { path: 'files/:nodeId/view', component: FileViewComponent, canActivate: [AuthGuardEcm], outlet: 'overlay' },
  { path: 'preview/blob', component: BlobViewComponent, outlet: 'overlay', pathMatch: 'full' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'apps',
        component: AppsComponent,
        canActivate: [AuthGuardBpm]
      },
      {
        path: 'apps/:appName/tasks',
        component: TasksComponent,
        canActivate: [AuthGuardBpm]
      },
      {
        path: 'apps/:appName/tasks/:taskId',
        component: TaskDetailsComponent,
        canActivate: [AuthGuardBpm]
      },
      {
        path: 'apps/:appName/start-process',
        component: StartProcessComponent,
        canActivate: [AuthGuardBpm]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

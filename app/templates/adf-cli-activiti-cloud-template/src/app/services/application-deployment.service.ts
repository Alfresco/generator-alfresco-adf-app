/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Injectable, } from '@angular/core';
import { AppConfigService, LogService, AlfrescoApiService } from '@alfresco/adf-core';
import { Observable, of } from 'rxjs';
import { AppsProcessCloudService, ApplicationInstanceModel } from '@alfresco/adf-process-services-cloud';

@Injectable()
export class ApplicationDeploymentService extends AppsProcessCloudService {

    deployedApps: ApplicationInstanceModel[];

    constructor(apiService: AlfrescoApiService, logService: LogService, private appConfig: AppConfigService) {
        super(apiService, logService, appConfig);

        this.loadApps();
    }

    getDeployedApplicationsByStatus(status: string): Observable<ApplicationInstanceModel[]> {
        return this.hasDeployedApps() ? of(this.deployedApps) : super.getDeployedApplicationsByStatus(status);
    }

    hasDeployedApps(): boolean {
        return this.deployedApps && this.deployedApps.length > 0;
    }

    loadApps() {
        const apps = this.appConfig.get<any>('alfresco-deployed-apps', []);
        apps.map((app) => {
            app.theme = app.theme ? app.theme : 'theme-1';
            app.icon = app.icon ? app.icon : 'favorite';
        });
        this.deployedApps = apps;
    }

}

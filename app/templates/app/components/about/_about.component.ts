<%- licenseHeader %>

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ObjectDataTableAdapter } from 'ng2-alfresco-datatable';
import { LogService, AppConfigService } from 'ng2-alfresco-core';

@Component({
    selector: 'about-page',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    data: ObjectDataTableAdapter;
    githubUrlCommitAlpha: string = 'https://github.com/Alfresco/alfresco-ng2-components/commits/';

    configFile: string = '';
    ecmHost: string = '';
    bpmHost: string = '';

    constructor(private http: Http,
                private appConfig: AppConfigService,
                private logService: LogService) {
    }

    ngOnInit() {
        this.http.get('/versions.json').subscribe(response => {
            let regexp = new RegExp('^(ng2-activiti|ng2-alfresco|alfresco-)');

            let alfrescoPackages = Object.keys(response.json().dependencies).filter((val) => {
                this.logService.log(val);
                return regexp.test(val);
            });

            let alfrescoPackagesTableRepresentation = [];
            alfrescoPackages.forEach((val) => {
                this.logService.log(response.json().dependencies[val]);
                alfrescoPackagesTableRepresentation.push({
                    name: val,
                    version: response.json().dependencies[val].version
                });
            });

            this.gitHubLinkCreation(alfrescoPackagesTableRepresentation);

            this.logService.log(alfrescoPackagesTableRepresentation);

            this.data = new ObjectDataTableAdapter(alfrescoPackagesTableRepresentation, [
                {type: 'text', key: 'name', title: 'Name', sortable: true},
                {type: 'text', key: 'version', title: 'Version', sortable: true}
            ]);
        });

        this.configFile = this.appConfig.configFile;
        this.ecmHost = this.appConfig.get<string>('ecmHost');
        this.bpmHost = this.appConfig.get<string>('bpmHost');
    }

    private gitHubLinkCreation(alfrescoPackagesTableRepresentation): void {
        let corePackage = alfrescoPackagesTableRepresentation.find((packageUp) => {
            return packageUp.name === 'ng2-alfresco-core';
        });

        if (corePackage) {
            let commitIsh = corePackage.version.split('-');
            if (commitIsh.length > 1) {
                this.githubUrlCommitAlpha = this.githubUrlCommitAlpha + commitIsh[1];
            } else {
                this.githubUrlCommitAlpha = this.githubUrlCommitAlpha + corePackage.version;
            }
        }
    }
}

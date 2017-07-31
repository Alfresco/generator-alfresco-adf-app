<%- licenseHeader %>

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDefinitionRepresentationModel } from 'ng2-activiti-tasklist';

@Component({
    selector: 'activiti-apps-view',
    template: `
        <activiti-apps (appClick)="onAppClicked($event)"></activiti-apps>
    `
})
export class ActivitiAppsViewComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

     onAppClicked(app: AppDefinitionRepresentationModel) {
         this.router.navigate(['/activiti/apps', app.id || 0, 'tasks']);
     }

}

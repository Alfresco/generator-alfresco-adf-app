

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'activiti-show-diagram',
    templateUrl: './activiti-show-diagram.component.html',
    styleUrls: ['./activiti-show-diagram.component.css']
})
export class ActivitiShowDiagramComponent {

    processDefinitionId: string;
    appId: string;

    constructor(private route: ActivatedRoute,
                private router: Router) {
        this.route.params.subscribe(params => {
            this.processDefinitionId = params['processDefinitionId'];
            this.appId = params['appId'];
        });
    }

    onClickBack() {
        this.router.navigate(['/activiti/apps/' + this.appId + '/processes']);
    }

}

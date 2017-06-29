<%- licenseHeader %>

import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'activiti-show-diagram',
    templateUrl: './activiti-show-diagram.component.html',
    styleUrls: ['./activiti-show-diagram.component.css']
})
export class ActivitiShowDiagramComponent {

    sub: Subscription;
    processDefinitionId: string;

    constructor(private route: ActivatedRoute,
                private location: Location) {
        this.sub = this.route.params.subscribe(params => {
            this.processDefinitionId = params['processDefinitionId'];
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onClickBack() {
        this.location.back();
    }

}

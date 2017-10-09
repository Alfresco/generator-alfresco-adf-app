

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'form-viewer',
    templateUrl: './form-viewer.component.html',
    styleUrls: ['./form-viewer.component.css']
})
export class FormViewerComponent implements OnInit, OnDestroy {

    taskId: string;

    private sub: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.taskId = params['id'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

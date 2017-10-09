

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'form-node-viewer',
    templateUrl: './form-node-viewer.component.html',
    styleUrls: ['./form-node-viewer.component.css']
})
export class FormNodeViewerComponent implements OnInit, OnDestroy {

    nodeId: string;

    private sub: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.nodeId = params['id'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

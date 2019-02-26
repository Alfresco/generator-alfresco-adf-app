import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewService } from '../services/preview.service';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

    appName: string = null;
    taskId: string = null;
    fileShowed: any = null;
    content: any = null;
    contentName: any = null;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['appName']) {
                this.appName = params['appName'];
            }
            if (params['taskId']) {
                this.taskId = params['taskId'];
            }
        });
    }

}



import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ProcessUploadService, TaskAttachmentListComponent } from 'ng2-activiti-tasklist';
import { ActivitiTaskListService } from 'ng2-activiti-tasklist';
import { UploadService } from 'ng2-alfresco-core';

@Component({
    selector: 'activiti-task-attachments',
    templateUrl: './activiti-task-attachments.component.html',
    styleUrls: ['./activiti-task-attachments.component.css'],
    providers: [
        { provide: UploadService, useClass: ProcessUploadService }
    ]
})

export class ActivitiTaskAttachmentsComponent implements OnInit, OnChanges {

    @Input()
    taskId: string;

    @ViewChild(TaskAttachmentListComponent)
    taskAttachList: TaskAttachmentListComponent;

    fileShowed: boolean = false;
    content: Blob;
    contentName: string;

    taskDetails: any;

    constructor(private uploadService: UploadService,
                private activitiTaskList: ActivitiTaskListService) {

    }

    ngOnInit() {
        this.uploadService.fileUploadComplete.subscribe(value => this.onFileUploadComplete(value.data));
    }

    ngOnChanges() {
        if (this.taskId) {
            this.activitiTaskList.getTaskDetails(this.taskId).map((res) => res).subscribe(
                (res: any) => {
                    this.taskDetails = res;
                });
        }
    }

    onFileUploadComplete(content: any) {
        this.taskAttachList.add(content);
    }

    onAttachmentClick(content: any): void {
        this.fileShowed = true;
        this.content = content.contentBlob;
        this.contentName = content.name;
    }

    isCompletedTask(): boolean {
        return this.taskDetails && this.taskDetails.endDate !== undefined && this.taskDetails.endDate !== null;
    }
}

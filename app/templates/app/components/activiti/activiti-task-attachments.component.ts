<%- licenseHeader %>

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProcessUploadService, TaskAttachmentListComponent } from 'ng2-activiti-tasklist';
import { UploadService } from 'ng2-alfresco-core';

@Component({
    selector: 'activiti-task-attachments',
    templateUrl: './activiti-task-attachments.component.html',
    styleUrls: ['./activiti-task-attachments.component.css'],
    providers: [
        { provide: UploadService, useClass: ProcessUploadService }
    ]
})

export class ActivitiTaskAttachmentsComponent implements OnInit {

    @Input()
    taskId: string;

    @ViewChild(TaskAttachmentListComponent)
    taskAttachList: TaskAttachmentListComponent;

    fileShowed: boolean = false;
    content: Blob;
    contentName: string;

    constructor(private uploadService: UploadService) {

    }

    ngOnInit() {
        this.uploadService.fileUploadComplete.subscribe(value => this.onFileUploadComplete(value.data));
    }

    onFileUploadComplete(content: any) {
        this.taskAttachList.add(content);
    }

    onAttachmentClick(content: any): void {
        this.fileShowed = true;
        this.content = content.contentBlob;
        this.contentName = content.name;
    }

}

<%- licenseHeader %>

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProcessAttachmentListComponent, ProcessUploadService } from 'ng2-activiti-processlist';
import { UploadService } from 'ng2-alfresco-core';

@Component({
    selector: 'activiti-process-attachments',
    templateUrl: './activiti-process-attachments.component.html',
    styleUrls: ['./activiti-process-attachments.component.css'],
    providers: [
        { provide: UploadService, useClass: ProcessUploadService }
    ]
})

export class ActivitiProcessAttachmentsComponent implements OnInit {

    @Input()
    processId: string;

    @ViewChild(ProcessAttachmentListComponent)
    processAttachList: ProcessAttachmentListComponent;

    fileShowed: boolean = false;
    content: Blob;
    contentName: string;

    constructor(private uploadService: UploadService) {

    }

    ngOnInit() {
        this.uploadService.fileUploadComplete.subscribe(value => this.onFileUploadComplete(value.data));
    }

    onFileUploadComplete(content: any) {
        this.processAttachList.add(content);
    }

    onAttachmentClick(content: any): void {
        this.fileShowed = true;
        this.content = content.contentBlob;
        this.contentName = content.name;
    }

}

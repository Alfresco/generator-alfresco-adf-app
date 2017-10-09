

import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ProcessAttachmentListComponent, ProcessUploadService } from 'ng2-activiti-processlist';
import { ProcessInstance, ProcessService } from 'ng2-activiti-processlist';
import { UploadService } from 'ng2-alfresco-core';

@Component({
    selector: 'activiti-process-attachments',
    templateUrl: './activiti-process-attachments.component.html',
    styleUrls: ['./activiti-process-attachments.component.css'],
    providers: [
        {provide: UploadService, useClass: ProcessUploadService}
    ]
})

export class ActivitiProcessAttachmentsComponent implements OnInit, OnChanges {

    @Input()
    processId: string;

    @ViewChild(ProcessAttachmentListComponent)
    processAttachList: ProcessAttachmentListComponent;

    fileShowed: boolean = false;
    content: Blob;
    contentName: string;
    processInstance: ProcessInstance;

    constructor(private uploadService: UploadService, private processService: ProcessService) {
    }

    ngOnInit() {
        this.uploadService.fileUploadComplete.subscribe(value => this.onFileUploadComplete(value.data));
    }

    ngOnChanges() {
        if (this.processId) {
            this.processService.getProcess(this.processId).subscribe((processInstance: ProcessInstance) => {
                this.processInstance = processInstance;
            });
        }
    }

    onFileUploadComplete(content: any) {
        this.processAttachList.add(content);
    }

    onAttachmentClick(content: any): void {
        this.fileShowed = true;
        this.content = content.contentBlob;
        this.contentName = content.name;
    }

    isCompletedProcess(): boolean {
        return this.processInstance && this.processInstance.ended !== undefined && this.processInstance.ended !== null;
    }

}

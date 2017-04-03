<%- licenseHeader %>

import { Component, OnInit, Optional, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlfrescoAuthenticationService, LogService } from 'ng2-alfresco-core';
import { DocumentActionsService, DocumentListComponent<% if (bpmTaskPage == true) { %>, ContentActionHandler, DocumentActionModel, FolderActionModel<% } %> } from 'ng2-alfresco-documentlist';
<% if (bpmTaskPage == true) { %>import { FormService } from 'ng2-activiti-form';<% } %>

@Component({
    selector: 'files-component',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
    // The identifier of a node. You can also use one of these well-known aliases: -my- | -shared- | -root-
    currentFolderId: string = '-my-';

    errorMessage: string = null;
    fileNodeId: any;
    fileShowed: boolean = false;
    multipleFileUpload: boolean = false;
    folderUpload: boolean = false;
    acceptedFilesTypeShow: boolean = false;
    versioning: boolean = false;
    acceptedFilesType: string = '.jpg,.pdf,.js';

    @ViewChild(DocumentListComponent)
    documentList: DocumentListComponent;

  constructor(private documentActions: DocumentActionsService,
              private authService: AlfrescoAuthenticationService,
              <% if (bpmTaskPage == true) { %>private formService: FormService,<% } %>
              private logService: LogService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              @Optional() private route: ActivatedRoute) {
    documentActions.setHandler('my-handler', this.myDocumentActionHandler.bind(this));
  }

    myDocumentActionHandler(obj: any) {
        window.alert('my custom action handler');
    }

    myCustomAction1(event) {
        alert('Custom document action for ' + event.value.entry.name);
    }

    myFolderAction1(event) {
        alert('Custom folder action for ' + event.value.entry.name);
    }

    showFile(event) {
        if (event.value.entry.isFile) {
            this.fileNodeId = event.value.entry.id;
            this.fileShowed = true;
        } else {
            this.fileShowed = false;
        }
    }

    toggleMultipleFileUpload() {
        this.multipleFileUpload = !this.multipleFileUpload;
        return this.multipleFileUpload;
    }

    toggleFolder() {
        this.multipleFileUpload = false;
        this.folderUpload = !this.folderUpload;
        return this.folderUpload;
    }

    toggleAcceptedFilesType() {
        this.acceptedFilesTypeShow = !this.acceptedFilesTypeShow;
        return this.acceptedFilesTypeShow;
    }

    toggleVersioning() {
        this.versioning = !this.versioning;
        return this.versioning;
    }

  ngOnInit() {
  if (this.route) {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.currentFolderId = params['id'];
        this.changeDetector.detectChanges();
      }
    });
  }
  <% if (bpmTaskPage == true) { %>
    if (this.authService.isBpmLoggedIn()) {
      this.formService.getProcessDefinitions().subscribe(
        defs => this.setupBpmActions(defs || []),
        err => this.logService.error(err)
      );
    } else {
      this.logService.warn('You are not logged in to BPM');
    }<% } %>
  }

    viewActivitiForm(event?: any) {
        this.router.navigate(['/activiti/tasksnode', event.value.entry.id]);
    }

    onNavigationError(err: any) {
        if (err) {
            this.errorMessage = err.message || 'Navigation error';
        }
    }

    resetError() {
        this.errorMessage = null;
    }

      <% if (bpmTaskPage == true) { %>private setupBpmActions(actions: any[]) {
        actions.map(def => {
            let documentAction = new DocumentActionModel();
            documentAction.title = 'Activiti: ' + (def.name || 'Unknown process');
            documentAction.handler = this.getBpmActionHandler(def);
            this.documentList.actions.push(documentAction);

            let folderAction = new FolderActionModel();
            folderAction.title = 'Activiti: ' + (def.name || 'Unknown process');
            folderAction.handler = this.getBpmActionHandler(def);
            this.documentList.actions.push(folderAction);
        });
    }

    private getBpmActionHandler(processDefinition: any): ContentActionHandler {
        return function (obj: any, target?: any) {
            window.alert(`Starting BPM process: ${processDefinition.id}`);
        }.bind(this);
    } <% } %>
}

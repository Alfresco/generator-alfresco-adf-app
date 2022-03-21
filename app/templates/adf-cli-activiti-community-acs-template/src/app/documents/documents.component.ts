import { Component, ViewChild, Input } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { PreviewService } from '../services/preview.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {

  @Input()
  showViewer = false;

  nodeId: string = null;

  @ViewChild('documentList', { static: true })
  documentList: DocumentListComponent;

  constructor(private notificationService: NotificationService, private preview: PreviewService) {
  }

  uploadSuccess() {
    this.notificationService.openSnackMessage('File uploaded');
    this.documentList.reload();
  }

  showPreview(event) {
    const entry = event.value.entry;
    if (entry && entry.isFile) {
      this.preview.showResource(entry.id);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormRenderingService } from '@alfresco/adf-core';
import { CustomEditorComponent } from '../stencils.module';
import { PreviewService } from '../services/preview.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  appId: string = null;
  taskId: string = null;
  fileShowed: any = null;
  content: any = null;
  contentName: any = null;

  constructor(private route: ActivatedRoute,
              formRenderingService: FormRenderingService,
              private preview: PreviewService) {
    formRenderingService.setComponentTypeResolver('testole_01', () => CustomEditorComponent, true);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.appId && params.appId !== '0') {
          this.appId = params.appId;
      }
      if (params.taskId) {
        this.taskId = params.taskId;
      }
    });
  }

  onContentClick(content: any): void {
    if (content.contentBlob) {
      this.preview.showBlob(content.name, content.contentBlob);
    } else {
      this.preview.showResource(content.sourceId.split(';')[0]);
    }
  }

}

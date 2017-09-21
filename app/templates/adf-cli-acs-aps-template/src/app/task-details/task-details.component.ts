import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormRenderingService } from 'ng2-activiti-form';
import { CustomEditorComponent } from '../stencils.module';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  appId: string = null;
  taskId: string = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              formRenderingService: FormRenderingService) {
    formRenderingService.setComponentTypeResolver('demo_component_01', () => CustomEditorComponent);
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

}

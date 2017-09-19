import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetailsModel } from 'ng2-activiti-tasklist';

@Component({
  selector: 'app-start-task',
  templateUrl: './start-task.component.html',
  styleUrls: ['./start-task.component.css']
})
export class StartTaskComponent implements OnInit {

  appId: string = null;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params.appId && params.appId !== '0') {
            this.appId = params.appId;
        }
      });
    }

  onTaskStarted(task: TaskDetailsModel) {
    this.router.navigate(['/apps', this.appId || 0, 'tasks', task.id]);
  }

  onCancelStartTask() {
    this.router.navigate(['/apps', this.appId || 0, 'tasks']);
  }
}

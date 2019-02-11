import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    appName: string = null;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const applicationName = params['appName'];
      if (applicationName) {
          this.appName = params['appName'];
      }
    });
  }

  onRowClick(taskId: string) {
    if (taskId) {
      this.router.navigate(['/apps', this.appName || 0, 'tasks', taskId]);
    }
  }

}

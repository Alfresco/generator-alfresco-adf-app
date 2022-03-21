import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-task',
  templateUrl: './start-task.component.html'
})
export class StartTaskComponent {

  constructor(private router: Router) { }

  onTaskStarted() {
    this.router.navigate(['/community/tasks']);
  }

  onCancelStartTask() {
    this.router.navigate(['/community/tasks']);
  }
}

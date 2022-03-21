import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html'
})
export class StartProcessComponent {

  constructor(private router: Router) { }

  onProcessStarted() {
    this.router.navigate(['/community/tasks']);
  }

  onCancelStartProcess() {
    this.router.navigate(['/community/tasks']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss']
})
export class StartProcessComponent {

  constructor(private router: Router) { }

  onProcessStarted(process: any) {
    this.router.navigate(['/community/tasks']);
  }

  onCancelStartProcess() {
    this.router.navigate(['/community/tasks']);
  }
}

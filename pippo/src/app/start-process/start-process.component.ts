import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss']
})
export class StartProcessComponent implements OnInit {

  appName: string = null;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.appName) {
          this.appName = params.appName;
      } else {
        this.router.navigate(['/apps']);
      }
    });
  }

  onProcessStarted(process: any) {
    this.router.navigate(['/apps', this.appName || 0, 'tasks']);
  }

  onCancelStartProcess() {
    this.router.navigate(['/apps', this.appName || 0, 'tasks']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html'
})
export class AppsComponent {

  constructor(private router: Router) {
  }

  onAppClicked(app: any) {
    this.router.navigate(['/apps', app.name, 'tasks']);
  }

}

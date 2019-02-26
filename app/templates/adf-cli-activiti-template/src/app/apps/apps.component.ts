import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AppDefinitionRepresentationModel } from '@alfresco/adf-process-services';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent {

  constructor(private router: Router) { }

  onAppClicked(app: any) {
    this.router.navigate(['/apps', app.name, 'tasks']);
  }

}

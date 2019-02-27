import { Component } from '@angular/core';
import { AppsProcessCloudService } from '@alfresco/adf-process-services-cloud';
import { Router } from '@angular/router';
import { ApplicationDeploymentService } from '../services/application-deployment.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css'],
  providers: [
    { provide: AppsProcessCloudService, useClass: ApplicationDeploymentService }
  ]
})
export class AppsComponent {

  constructor(private router: Router) {
  }

  onAppClicked(app: any) {
    this.router.navigate(['/apps', app.name, 'tasks']);
  }

}

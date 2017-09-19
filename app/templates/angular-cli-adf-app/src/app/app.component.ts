import { Component } from '@angular/core';
import { AlfrescoTranslationService } from 'ng2-alfresco-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(translationService: AlfrescoTranslationService) {
    translationService.use('en');
  }

}

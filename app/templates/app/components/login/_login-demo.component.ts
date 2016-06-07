import { Component } from 'angular2/core';
import { AlfrescoLoginComponent } from 'ng2-alfresco-login/dist/ng2-alfresco-login';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'login-demo',
  template: `<alfresco-login></alfresco-login>`,
  directives: [AlfrescoLoginComponent]
})
export class LoginDemoComponent {

}

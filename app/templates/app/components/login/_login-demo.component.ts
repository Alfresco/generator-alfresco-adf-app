<%- licenseHeader %>
import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'login-demo',
  templateUrl: './login-demo.component.html',
  styleUrls: ['./login-demo.component.css']
})
export class LoginDemoComponent {

  providers: string = 'ECM';

  constructor(public router: Router) {
  }

  onLogin($event) {
    console.log($event);
    this.router.navigate(['/home']);
  }

  onError($event) {
    console.log($event);
  }

  toggleECM(checked) {
    if (checked && this.providers === 'BPM') {
      this.providers = 'ALL';
    } else if (checked) {
      this.providers = 'ECM';
    } else {
      this.providers = undefined;
    }
  }

  toggleBPM(checked) {
    if (checked && this.providers === 'ECM') {
      this.providers = 'ALL';
    } else if (checked) {
      this.providers = 'BPM';
    } else {
      this.providers = undefined;
    }
  }
}

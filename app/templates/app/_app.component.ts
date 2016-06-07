import { Component } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { MDL } from 'ng2-alfresco-core/dist/ng2-alfresco-core';
import { AuthRouterOutlet } from './components/router/AuthRouterOutlet';
import {
  AlfrescoSettingsService,
  AlfrescoAuthenticationService
} from 'ng2-alfresco-core/dist/ng2-alfresco-core';
import { LoginDemoComponent } from './components/login/login-demo.component';

declare var document: any;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, AuthRouterOutlet, MDL]
})
@RouteConfig([
  {path: '/', name: 'Login', component: LoginDemoComponent, useAsDefault: true}
])
export class AppComponent {
  constructor(public auth: AlfrescoAuthenticationService,
              public router: Router,
              alfrescoSettingsService: AlfrescoSettingsService) {
    alfrescoSettingsService.host = 'http://192.168.99.100:8080';
  }

  isActive(instruction: any[]): boolean {
    return this.router.isRouteActive(this.router.generate(instruction));
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  onLogout(event) {
    event.preventDefault();
    this.auth.logout()
      .subscribe(
        () => this.router.navigate(['Login'])
      );
  }

  hideDrawer() {
    // todo: workaround for drawer closing
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
  }
}

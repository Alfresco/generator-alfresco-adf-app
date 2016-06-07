import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';
import { ALFRESCO_CORE_PROVIDERS } from 'ng2-alfresco-core/dist/ng2-alfresco-core';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ALFRESCO_CORE_PROVIDERS
]);

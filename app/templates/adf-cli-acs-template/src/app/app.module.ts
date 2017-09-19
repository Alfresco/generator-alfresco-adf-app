import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ADF modules
import { AdfModule } from './adf.module';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardEcm } from 'ng2-alfresco-core';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'documentlist',
    component: DocumentlistComponent,
    canActivate: [ AuthGuardEcm ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),

    // ADF modules
    AdfModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentlistComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

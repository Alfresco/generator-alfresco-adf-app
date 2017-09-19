import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ADF modules
import { AdfModule } from './adf.module';

// App components
import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';
import { HomeComponent } from './home/home.component';
import { ViewerComponent } from './viewer/viewer.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'datatable', component: DatatableComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: 'documentlist', component: DocumentlistComponent }
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
    DatatableComponent,
    HomeComponent,
    ViewerComponent,
    DocumentlistComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

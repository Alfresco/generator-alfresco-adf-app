import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';

// ADF modules
import { AdfModule } from './adf.module';


// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),

    // ADF modules
    AdfModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DocumentlistComponent,
    AppLayoutComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

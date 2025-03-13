import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CreatebusinessComponent } from './createbusiness/createbusiness.component';
import { ReadbusinessComponent } from './readbusiness/readbusiness.component';
import { ModifybusinessComponent } from './modifybusiness/modifybusiness.component';
import { RemovebusinessComponent } from './removebusiness/removebusiness.component';
import { ApplicationUserComponent } from './application-user/application-user.component';
import { ApplicationRoleComponent } from './application-role/application-role.component';
import { BrowserSessionComponent } from './browser-session/browser-session.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatebusinessComponent,
    ReadbusinessComponent,
    ModifybusinessComponent,
    RemovebusinessComponent,
    ApplicationUserComponent,
    ApplicationRoleComponent,
    BrowserSessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

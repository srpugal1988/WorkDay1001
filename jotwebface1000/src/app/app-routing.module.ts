import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; 
import { CreatebusinessComponent } from './createbusiness/createbusiness.component';
import { ReadbusinessComponent } from './readbusiness/readbusiness.component';  
import { ModifybusinessComponent } from './modifybusiness/modifybusiness.component';
import { RemovebusinessComponent } from './removebusiness/removebusiness.component';
import { ApplicationUserComponent } from './application-user/application-user.component';
import { ApplicationRoleComponent } from './application-role/application-role.component';
import { BrowserSessionComponent } from './browser-session/browser-session.component';

const routes: Routes = [
    {
      path: 'jotwebface1000/login', component: LoginComponent
    },
    {
      path: 'jotwebface1000/home', component: HomeComponent
    },
    {
      path: 'jotwebface1000/businessCreatePage', component: CreatebusinessComponent
    },
    {
      path: 'jotwebface1000/businessReadPage', component: ReadbusinessComponent
    },
    {
      path: 'jotwebface1000/businessUpdatePage', component: ModifybusinessComponent
    },
    {
      path: 'jotwebface1000/businessDeletePage', component: RemovebusinessComponent
    },
    {
      path: 'jotwebface1000/settingsUserPage', component: ApplicationUserComponent
    },
    {
      path: 'jotwebface1000/settingsRolePage', component: ApplicationRoleComponent
    },
    {
      path: 'jotwebface1000/settingsBrowserSessionPage', component: BrowserSessionComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

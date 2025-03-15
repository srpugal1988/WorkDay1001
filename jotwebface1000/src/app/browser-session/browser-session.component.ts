import { Component } from '@angular/core';
import { Displayinfo } from '../models/displayinfo.model';
import { Menuinfo } from '../models/Menuinfo.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionInfo } from '../models/SessionInfo.model';


@Component({
  selector: 'app-browser-session',
  templateUrl: './browser-session.component.html',
  styleUrl: './browser-session.component.css'
})
export class BrowserSessionComponent {

    displayname:any ;
    rolename : any;
    moduleindex : any;
    client : any;
    version : any;
  
    globalId : any;
  
    DisplayinfoOne?: Displayinfo;
  
    Menuinfolist?: Menuinfo[];

    SessionInfoList?: SessionInfo[];

    Jwttoken? : String;
  
    constructor(private httpClient: HttpClient,private router: Router,private formsmodule:FormsModule) {}


    ngOnInit(): void {

      this.globalId=localStorage.getItem("globalid");
      this.displayname = localStorage.getItem("displayname");
      this.rolename = localStorage.getItem("rolename");
      this.client = localStorage.getItem("client");
      this.version = localStorage.getItem("version");
      this.Jwttoken = localStorage.getItem("jwttoken")+"";
  
      this.moduleindex="3310";
      this.loadMenuBar();
      this.retriveLoginUserInformations();
      this.retriveSessionInformations();
    }

    
 loadMenuBar(): void{

        const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
        var url="http://localhost:8080/Jotwebserviceapi1000/menu?globalId="+this.globalId+"&hopeJwt=Yes";
        this.httpClient.get<any>(url,{headers}).subscribe({
        next: data => {
          this.Menuinfolist = data.pocket;
          this.myFunction(this.Menuinfolist);
        },
        error: error => {
            console.error('There was an error!', error);
        }
      })

}

myFunction(arr:any):void {

      var out = "";
      var i;
      for(i = 0; i < arr.length; i++) {
      var mid="M"+arr[i].id;
      var rights=arr[i].rights;
      
      
      if(rights=="1"){
            (<HTMLInputElement>document.getElementById(mid)).style.display="block";
      }else{
            (<HTMLInputElement>document.getElementById(mid)).style.display="none";
      }
      
      }
}

retriveLoginUserInformations(): void {

      const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
      var url="http://localhost:8080/Jotwebserviceapi1000/auth/checkLoginUser?moduleindex="+this.moduleindex+"&globalId="+this.globalId+"&hopeJwt=Yes";
      this.httpClient.get<any>(url,{headers}).subscribe({
      next: data => {

        if(data.code=='100'){
            // this.DisplayinfoOne = data.pocket;
        }
        else if(data.code=='99'){
              this.router.navigate(['jotwebface1000/login']);
              alert("Kindly login to proceed further!...");
        }
        else if(data.code=='98'){
              this.router.navigate(['jotwebface1000/login']);
              alert("You dont have access to this page! Kindly login");
        }

      },
      error: error => {
          console.error('There was an error!', error);
      }
      })

}

public retriveSessionInformations() : void {
  const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
  var url = "http://localhost:8080/Jotwebserviceapi1000/settingsctrl/browser/sessions/fetchall?globalId="+this.globalId+"&hopeJwt=Yes";
  this.httpClient.get<any>(url,{headers}).subscribe({
    next: data => {

        if(data.code=='100'){
          alert(data.message);
          this.SessionInfoList=data.pocket;
        }
        else if(data.code=='97'){          
          alert(data.message );
          this.router.navigate(['jotwebface1000/login']);
        }

    },
    error: error => {
        console.error('There was an error!', error);
    }
})

}

  Refresh() : void {
    window.location.reload();
  }

  proceedlogout() : void {
    
    const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
    var thisurl="http://localhost:8080/Jotwebserviceapi1000/auth/logout?globalId="+this.globalId+"&hopeJwt=Yes";
    this.httpClient.get<any>(thisurl,{headers}).subscribe({
      next: data => {
          this.router.navigate(['jotwebface1000/login']);
      },
      error: error => {
           alert("error");
          console.error('There was an error!', error);
      }
  })


}

}

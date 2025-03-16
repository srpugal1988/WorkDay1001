import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Displayinfo } from '../models/displayinfo.model';
import { Menuinfo } from '../models/Menuinfo.model';
import { Router } from '@angular/router';
import { MasterUtil } from '../types/master';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  displayname:any ;
  rolename : any;
  moduleindex : any;
  client : any;
  version : any;

  globalId : any;

  DisplayinfoOne?: Displayinfo;

  Menuinfolist?: Menuinfo[];

  Jwttoken? : String;

  constructor(private httpClient: HttpClient,private router: Router) {}
  

  ngOnInit(): void {
    
    this.globalId=localStorage.getItem("globalid");
    this.displayname = localStorage.getItem("displayname");
    this.rolename = localStorage.getItem("rolename");
    this.client = localStorage.getItem("client");
    this.version = localStorage.getItem("version");
    this.Jwttoken = localStorage.getItem("jwttoken")+"";

    this.moduleindex="1000";
    this.loadMenuBar();
    this.checkForPageAccess();

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

  checkForPageAccess(): void {

      const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
      var url="http://localhost:8080/Jotwebserviceapi1000/auth/checkForPageAccess?moduleindex="+this.moduleindex+"&globalId="+this.globalId+"&hopeJwt=Yes";
      this.httpClient.get<any>(url,{headers}).subscribe({
      next: data => {

        if(data.code=='100'){
             //YOU HAVE ACCESS TO THIS PAGE
        }
        else if(data.code=='98'){
              alert(data.message);
              this.router.navigate(['jotwebface1000/login']);
        }
        else if(data.code=='97'){
              alert(data.message);
              //this.router.navigate(['jotwebface1000/home']);
        }
        else if(data.code=='96'){
          alert(data.message);
          this.router.navigate(['jotwebface1000/login']);
        }
        else {
              alert(data.message);
        }
  
      },
      error: error => {
          console.error('There was an error!', error);
      }
      })


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
 
  Refresh() : void {
    window.location.reload();
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Displayinfo } from '../models/displayinfo.model';
import { Menuinfo } from '../models/Menuinfo.model';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createbusiness',
  templateUrl: './createbusiness.component.html',
  styleUrl: './createbusiness.component.css'
})

export class CreatebusinessComponent {

  displayname:any ;
  rolename : any;
  moduleindex : any;
  client : any;
  version : any;

  globalId : any;

  DisplayinfoOne?: Displayinfo;

  Menuinfolist?: Menuinfo[];

  registerform  = new FormGroup({
    ownername: new FormControl(''),
    businessname: new FormControl(''),
    businesstype: new FormControl(''),
    email: new FormControl(''),
    phonenumber: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private httpClient: HttpClient,private router: Router) {}

  reqHeaders:any = new HttpHeaders({
     "Access-Control-Allow-Origin": "http://localhost:4200"
  });

  public handleSubmit() {
   // console.log(this.registerform.value);

    
   if(this.registerform.value.ownername==''){
    alert("Please enter the ownername");
   }
   else if(this.registerform.value.businessname==''){
    alert("please enter the businessname");
   }
   else if(this.registerform.value.businesstype==''){
    alert("please select the business type");
   }
   else if(this.registerform.value.email==''){
    alert("please enter the email");
   }
   else if(this.registerform.value.phonenumber==''){
    alert("please enter the phonenumber");
   }
   else if(this.registerform.value.password==''){
    alert("please enter the password");
   }
   else{

            var url="http://localhost:8080/Jotwebserviceapi1000/business/add";
            this.httpClient.post<any>(url,this.registerform.value).subscribe({
              next: data => {
                  alert(data.message);
              },
              error: error => {
                  console.error('There was an error!', error);
              }
          })

   }

  }


  ngOnInit(): void {

        this.globalId=localStorage.getItem("globalid");
        this.displayname = localStorage.getItem("displayname");
        this.rolename = localStorage.getItem("rolename");
        this.client = localStorage.getItem("client");
        this.version = localStorage.getItem("version");
        this.moduleindex="2100";
        this.loadMenuBar();
        this.retriveLoginUserInformations();
  }


  
  loadMenuBar(): void{

    var url="http://localhost:8080/Jotwebserviceapi1000/menu?id="+this.globalId;
    this.httpClient.get<any>(url).subscribe({
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
    
    var url="http://localhost:8080/Jotwebserviceapi1000/auth/checkLoginUser?moduleindex="+this.moduleindex+"&id="+this.globalId;
    
    this.httpClient.get<any>(url).subscribe({
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





}

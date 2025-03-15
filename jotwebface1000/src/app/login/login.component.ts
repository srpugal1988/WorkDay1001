import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { error } from 'console';
import { Router } from '@angular/router';
import { Displayinfo } from '../models/displayinfo.model';
import { json } from 'stream/consumers';
import { UserInfo } from '../models/UserInfo.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  DisplayinfoOne?: Displayinfo;

  moduleindex : any;

  GlobalUser? : UserInfo;

  Jwttoken? : String;

  logindata  = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });



  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.moduleindex="1";
    this.hidelodingicon();
    this.Jwttoken="";
    //this.retriveLoginUserInformations();
    //localStorage.clear();
  }

  public handleSubmit() {
     const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
     var thisurls="http://localhost:8080/Jotwebserviceapi1000/auth/login?hopeJwt=No";
     
     if(this.logindata.value.username==''){
      alert("Please enter username");
     }
     else if(this.logindata.value.password==''){
      alert("please enter password");
     }
     else{

      this.showloadingicon();

      this.httpClient.post<any>(thisurls,this.logindata.value,{headers}).subscribe({
        next: data => {
            this.hidelodingicon();

            if(data.code=='100'){

              this.GlobalUser=data.pocket.UserInfo;
              this.DisplayinfoOne=data.pocket.DisplayInfo;
              this.Jwttoken=data.pocket.jwttoken;

              localStorage.setItem("globalid",this.GlobalUser?.globalId+"");
              localStorage.setItem("displayname",this.DisplayinfoOne?.displayname+"");
              localStorage.setItem("rolename",this.DisplayinfoOne?.rolename+"");
              localStorage.setItem("client",this.DisplayinfoOne?.client+"");
              localStorage.setItem("version",this.DisplayinfoOne?.version+"");
              localStorage.setItem("jwttoken",this.Jwttoken+"");

              //alert("wooo"+this.Jwttoken);

              this.router.navigate(['jotwebface1000/home']);
              
            }
            else{
              alert(data.message);
             }
        },
        error: error => {
            this.hidelodingicon();
            console.error('There was an error!', error);
        }
    })


     }
 

  }


  showloadingicon():void {
    (<HTMLInputElement> document.getElementById("loader")).style.display="block";
  } 

  hidelodingicon():void{
     (<HTMLInputElement> document.getElementById("loader")).style.display="none";
  }
  

  retriveLoginUserInformations(): void {
   
    var url="http://localhost:8080/Jotwebserviceapi1000/auth/checkLoginUser?moduleindex="+this.moduleindex;

    this.httpClient.get<any>(url).subscribe({
      next: data => {

        if(data.code=='100'){
              this.router.navigate(['jotwebface1000/home']);
        }
        else {
              this.router.navigate(['jotwebface1000/login']);
        }
  
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })

  }

}

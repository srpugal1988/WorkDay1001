import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../models/business.model';
import { Displayinfo } from '../models/displayinfo.model';
import { Menuinfo } from '../models/Menuinfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-readbusiness',
  templateUrl: './readbusiness.component.html',
  styleUrl: './readbusiness.component.css'
})
export class ReadbusinessComponent {

  constructor(private httpClient: HttpClient,private router: Router) {}
  
  Businesslist?: Business[];

    displayname:any ;
    rolename : any;
    moduleindex : any;
    client : any;
    version : any;
  
    globalId : any;

    DisplayinfoOne?: Displayinfo;

    Menuinfolist?: Menuinfo[];

  ngOnInit(): void {
        this.globalId=localStorage.getItem("globalid");
        this.displayname = localStorage.getItem("displayname");
        this.rolename = localStorage.getItem("rolename");
        this.client = localStorage.getItem("client");
        this.version = localStorage.getItem("version");
        this.moduleindex="2200";
        this.loadMenuBar();
        this.retriveLoginUserInformations();
        this.retriveBusinessInformations();
  }

  public retriveBusinessInformations() {
 
     this.httpClient.get<any>('http://localhost:8080/Jotwebserviceapi1000/business/fetchall').subscribe({
       next: data => {
           this.Businesslist=data.pocket;
           
           alert(data.message);
       },
       error: error => {
           console.error('There was an error!', error);
       }
   })
 
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
                //this.DisplayinfoOne = data.pocket;
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

import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../models/business.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Displayinfo } from '../models/displayinfo.model';
import { Menuinfo } from '../models/Menuinfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifybusiness',
  templateUrl: './modifybusiness.component.html',
  styleUrl: './modifybusiness.component.css'
})
export class ModifybusinessComponent {

  constructor(private httpClient: HttpClient,private router: Router) {}
  
  displayname:any ;
  rolename : any;
  moduleindex : any;
  client : any;
  version : any;

  globalId : any;

  DisplayinfoOne?: Displayinfo;
  
  Menuinfolist?: Menuinfo[];

  Businesslist?: Business[];

  BusinessOne?: Business;

  showUserAddNewPopup:boolean=false;

  modifyform  = new FormGroup({
    id:new FormControl(''),
    ownername: new FormControl(''),
    businessname: new FormControl(''),
    businesstype: new FormControl(''),
    email: new FormControl(''),
    phonenumber: new FormControl(''),
    password: new FormControl('')
  });


  @Input() currentBusiness: Business = {
    id:"",
    ownername:"",
    businessname:"",
    businesstype:"",
    email:"",
    phonenumber:"",
    password:""
  };

  
  ngOnInit(): void {

        this.globalId=localStorage.getItem("globalid");
        this.displayname = localStorage.getItem("displayname");
        this.rolename = localStorage.getItem("rolename");
        this.client = localStorage.getItem("client");
        this.version = localStorage.getItem("version");
        this.moduleindex="2300";
        this.loadMenuBar();
        this.closeUserAddNewPopup();
        this.retriveLoginUserInformations();
        this.retriveBusinessInformations();
  }

  handleChange(b:Business) {
      //var target = evt.target;
      //var businessid=target.value;
      
      alert(b.businessname);

      this.currentBusiness=b;
      this.openUserAddNewPopup();
  }


  public retriveBusinessInformations() {
 
     this.httpClient.get<any>('http://localhost:8080/Jotwebserviceapi1000/business/fetchall').subscribe({
       next: data => {
           this.Businesslist=data.pocket;
       },
       error: error => {
           console.error('There was an error!', error);
       }
   })
 
   }


   public retriveBusinessInfo(businessid:any) {
 
    var url="http://localhost:8080/Jotwebserviceapi1000/business/fetch/"+businessid;
    this.httpClient.get<any>(url).subscribe({
      next: data => {
          //alert(data.data);
          this.BusinessOne=data.pocket;
          this.openUserAddNewPopup();
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })

  }

  public handleSubmit() {
    
     var url="http://localhost:8080/Jotwebserviceapi1000/business/modify/"+this.currentBusiness.id;
     this.httpClient.put<any>(url,this.currentBusiness).subscribe({
       next: data => {
           alert(data.message);
       },
       error: error => {
           console.error('There was an error!', error);
       }
   })
 
   }


   public openUserAddNewPopup(){
		this.showUserAddNewPopup=true;
	};
	
	
	public closeUserAddNewPopup(){
		this.showUserAddNewPopup=false;
	};

  
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

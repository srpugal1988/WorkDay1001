import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { Displayinfo } from '../models/displayinfo.model';
import { Menuinfo } from '../models/Menuinfo.model';
import { RoleInfo } from '../models/Roleinfo.model';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { RoleRightsInfo } from '../models/RoleRightsInfo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-application-role',
  templateUrl: './application-role.component.html',
  styleUrl: './application-role.component.css'
})
export class ApplicationRoleComponent {

  
    displayname:any ;
    rolename : any;
    moduleindex : any;
    client : any;
    version : any;
  
    globalId : any;
    
    DisplayinfoOne?: Displayinfo;
  
    Menuinfolist?: Menuinfo[];
  
    roleslist? : RoleInfo[];

    rolesrightlist? : RoleRightsInfo[];

    roleid?: any;
    
    newrolename?: any;

    showUserRoleNewPopup?: boolean;

    Jwttoken? : String;

    constructor(private httpClient: HttpClient,private router: Router) {}
      
    ngOnInit(): void {

      this.globalId=localStorage.getItem("globalid");
      this.displayname = localStorage.getItem("displayname");
      this.rolename = localStorage.getItem("rolename");
      this.client = localStorage.getItem("client");
      this.version = localStorage.getItem("version");
      this.Jwttoken = localStorage.getItem("jwttoken")+"";
      this.moduleindex="3200";
      this.roleid=0;
      this.newrolename="";
      this.showUserRoleNewPopup=false;

      this.showloadingicon();

      this.loadMenuBar();
      this.retriveLoginUserInformations();
      this.loadRolesDropDown();
      this.closeUserRoleNewPopup();

      this.hidelodingicon();
      
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
              (<HTMLInputElement> document.getElementById(mid)).style.display="block";
         }else{
              (<HTMLInputElement> document.getElementById(mid)).style.display="none";
         }
         
      }

  }
  
    retriveLoginUserInformations(): void {
   
        const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
        var url="http://localhost:8080/Jotwebserviceapi1000/auth/checkLoginUser?moduleindex="+this.moduleindex+"&globalId="+this.globalId+"&hopeJwt=Yes";
        this.httpClient.get<any>(url,{headers}).subscribe({
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


    loadRolesDropDown():void{

       const current = new Date();
       const timestamp = current.getTime();
       const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
       var url="http://localhost:8080/Jotwebserviceapi1000/settingsctrl/role/fetchall?timestamp="+timestamp+"&hopeJwt=Yes&globalId="+this.globalId;

        this.httpClient.get<any>(url,{headers}).subscribe({
          next: data => {
            this.roleslist = data.pocket.rolesinformationlist;
          },
          error: error => {
              console.error('There was an error!', error);
          }
        })
    }


    roleChanging(event: Event):void{
      const value = (event.target as HTMLInputElement).value;
      this.roleid=value;
       this.loadModuleRightsInformation();
    }


    loadModuleRightsInformation():void{
      const current = new Date();
      const timestamp = current.getTime();
      const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
      var url="http://localhost:8080/Jotwebserviceapi1000/settingsctrl/role/rights?roleid="+this.roleid+"&timestamp="+timestamp+"&hopeJwt=Yes&globalId="+this.globalId;
   
      this.httpClient.get<any>(url,{headers}).subscribe({
      next: data => {
        
        this.rolesrightlist = data.pocket.rolesrightlist;
      
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
    }


    ChangeModuleAccess(mod:RoleRightsInfo):void{
      
          const current = new Date();
          const timestamp = current.getTime();
          const headers = { 'Authorization': 'Bearer '+this.Jwttoken };
          var url="http://localhost:8080/Jotwebserviceapi1000/settingsctrl/role/rightschange?roleid="+mod.roleid+"&timestamp="+timestamp+"&hopeJwt=Yes&globalId="+this.globalId;
          this.httpClient.post<any>(url,mod,{headers}).subscribe({
            next: data => {
              alert("Roles rights changed for the module:"+mod.modulename);
               this.loadModuleRightsInformation();
            },
            error: error => {
                console.error('There was an error!', error);
            }
        })
      
    }


    RoleRegistration():void{
	
      const current = new Date();
      const timestamp = current.getTime();
      const headers = { 'Authorization': 'Bearer '+this.Jwttoken };

          let nameTextBox = document.getElementById("newrolename") as HTMLInputElement;
          this.newrolename = nameTextBox.value;

          var RoleData = {
            rolename: this.newrolename
          };
  
          var url="http://localhost:8080/Jotwebserviceapi1000/settingsctrl/role/store?timestamp="+timestamp+"&hopeJwt=Yes&globalId="+this.globalId;
          this.httpClient.post<any>(url,RoleData,{headers}).subscribe({
            next: data => {
              alert(data.message);
               this.closeUserRoleNewPopup();
               this.ngOnInit();
            },
            error: error => {
                console.error('There was an error!', error);
            }
        })
      
      }


      openPopup1():void{
        (<HTMLInputElement> document.getElementById("newrolename")).value ="";
        this.openUserRoleNewPopup();
      };
      
      
      openUserRoleNewPopup():void{
        this.showUserRoleNewPopup=true;
         (<HTMLInputElement> document.getElementById("myModal")).style.display="block";
      };
      
      
      closeUserRoleNewPopup():void{
        this.showUserRoleNewPopup=false;
        (<HTMLInputElement> document.getElementById("myModal")).style.display="none";
      };

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

    showloadingicon():void {
      (<HTMLInputElement> document.getElementById("loader")).style.display="block";
    } 
  
    hidelodingicon():void{
       (<HTMLInputElement> document.getElementById("loader")).style.display="none";
    }

}

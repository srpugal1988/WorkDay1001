import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Input,NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Displayinfo } from '../models/displayinfo.model';
import { Menuinfo } from '../models/Menuinfo.model';
import { UserInfo } from '../models/UserInfo.model';
import { RoleInfo } from '../models/Roleinfo.model';
import { RouterTestingHarness } from '@angular/router/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-user',
  templateUrl: './application-user.component.html',
  styleUrl: './application-user.component.css'
})
export class ApplicationUserComponent {

  
  displayname:any ;
  rolename : any;
  moduleindex : any;
  client : any;
  version : any;

  globalId : any;
  
  Userslist?: UserInfo[];

  DisplayinfoOne?: Displayinfo;

  Menuinfolist?: Menuinfo[];

  selectedUserId?: any;

  showUserAddNewPopup?: any;

  roleslist? : RoleInfo[];

  roleid?: any;

  userrefno?: any;

  rl?: any;

  Jwttoken? : String;

  constructor(private httpClient: HttpClient,private router: Router) {}
    
  ngOnInit(): void {

    this.globalId=localStorage.getItem("globalid");
    this.displayname = localStorage.getItem("displayname");
    this.rolename = localStorage.getItem("rolename");
    this.client = localStorage.getItem("client");
    this.version = localStorage.getItem("version");
    this.Jwttoken = localStorage.getItem("jwttoken")+"";

    this.moduleindex="3100";
    this.roleid=0;
    this.userrefno=0;

    this.loadMenuBar();
    this.retriveLoginUserInformations();
    this.showUsersListGrid();
    this.closeUserAddNewPopup();
    this.loadRolesDropDown();
    this.loadUserReferenceNumber();

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


  showUsersListGrid():void{

        const current = new Date();
        const timestamp = current.getTime();
        const headers = { 'Authorization': 'Bearer '+'CCCCCCC' };

		    var url="http://localhost:8080/Jotwebserviceapi1000/settingsctrl/user/fetchall?timestamp="+timestamp+"&globalId="+this.globalId+"&hopeJwt=Yes"; 
        this.httpClient.get<any>(url,{headers}).subscribe({
          next: data => {
        
            if(data.code=='100'){
              alert(data.message);
              this.Userslist = data.pocket.userlist;
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


  handleChange(evt:any) {
       
     var target = evt.target;
     var selUserId=target.value;
     this.selectedUserId=selUserId;

    alert("process users;"+this.selectedUserId);

  }


  openPopup1():void{
    this.openUserAddNewPopup();
  }

  openUserAddNewPopup():void {
		this.showUserAddNewPopup=true;
    this.loadRolesDropDown();
    this.loadUserReferenceNumber();

    (<HTMLInputElement> document.getElementById("myModal")).style.display="block";
	}
	
	
	closeUserAddNewPopup():void {
		this.showUserAddNewPopup=false;
    (<HTMLInputElement> document.getElementById("myModal")).style.display="none";
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
			  
		// $scope.roleslist= ["ADMIN", "USER", "JOBSEEKER","CLIENT"];
	};
	
  roleChanging(event: Event):void{
    const radvalue = (event.target as HTMLInputElement).value;
     this.roleid=radvalue;
  }

	loadUserReferenceNumber():void {

		const current = new Date();
		const timestamp = current.getTime();
		const headers = { 'Authorization': 'Bearer '+this.Jwttoken };

    var url= "http://localhost:8080/Jotwebserviceapi1000/settingsctrl/user/getnextuserreferencenumber?timestamp="+timestamp+"&hopeJwt=Yes&globalId="+this.globalId;
    this.httpClient.get<any>(url,{headers}).subscribe({
      next: data => {
        this.userrefno= data.pocket.userreferencenumber;
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
	}


  
  UserRegistration():void {
      const current = new Date();
      const timestamp = current.getTime();
      const headers = { 'Authorization': 'Bearer '+this.Jwttoken };

      var userrefno= (<HTMLInputElement> document.getElementById("userrefno")).value;
      var firstname= (<HTMLInputElement> document.getElementById("firstname")).value;
      var lastname= (<HTMLInputElement> document.getElementById("lastname")).value;
      var email= (<HTMLInputElement> document.getElementById("email")).value;
      var contactnumber= (<HTMLInputElement> document.getElementById("contactnumber")).value;
      var jobtitle= (<HTMLInputElement> document.getElementById("jobtitle")).value;
      var roleid= this.roleid;
      var rolename= "";
      var username= (<HTMLInputElement> document.getElementById("username")).value;
      var password= (<HTMLInputElement> document.getElementById("password")).value;
      var retypepassword= (<HTMLInputElement> document.getElementById("retypepassword")).value;

 
      var valstatus=false;
      if(firstname==""){
        alert("Firstname cannot be empty");
        valstatus=false;
      }
      else if(lastname==""){
        alert("Lastname cannot be empty");
        valstatus=false;
      }
      else if(email==""){
        alert("Email cannot be empty");
        valstatus=false;
      }
      else if(contactnumber==""){
        alert("Contactnumber cannot be empty");
        valstatus=false;
      }
      else if(jobtitle==""){
        alert("Jobtitle cannot be empty");
        valstatus=false;
      }
      else if(roleid==undefined){
        alert("Selectedrole cannot be empty");
        valstatus=false;
      }
      else if(username==""){
        alert("Username cannot be empty");
        valstatus=false;
      }
      else if(password==""){
        alert("Password cannot be empty");
        valstatus=false;
      }
      else if(retypepassword==""){
        alert("Retypepassword cannot be empty");
        valstatus=false;
      }
      else if(retypepassword!=password){
        alert("Password and Retypepassword should be same");
        valstatus=false;
      }
      else{
        valstatus=true;
      }

       if(valstatus==true){

              var UserData = {
                userrefno:userrefno,
                firstname:firstname,
                lastname:lastname,
                email:email,
                contactnumber:contactnumber,
                jobtitle:jobtitle,
                roleid: roleid,
                rolename: rolename,
                username:username,
                password:password,
                retypepassword:retypepassword
          };

          //alert(UserData);
        
              var url="http://localhost:8080/Jotwebserviceapi1000/settingsctrl/user/store?timestamp="+timestamp+"&hopeJwt=Yes&globalId="+this.globalId;
              this.httpClient.post<any>(url,UserData,{headers}).subscribe({
                next: data => {
                    alert(data.message);
                    this.closeUserAddNewPopup();
                    this.ngOnInit();
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            })

       }
			
	     
	
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

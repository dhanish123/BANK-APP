


import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//3rd execution

  aim='your perfect banking partner';
  accounts="enter your Acno here";
  acno='';
  pswd='';

   //register model
   loginForm=this.fb.group({//group
   
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]//array

    //control goes to register.html
  })


  constructor(private fb:FormBuilder,private router:Router,private ds:DataService) { }//1st execution
//dependency injection

  ngOnInit(): void {//life cycle hooks - initial process //2nd execution
  } 
    userDetails:any ={//object of objects
      1000:{acno:1000,username:'Dhanish',password:1000,balance:10000},
      1001:{acno:1001,username:'karthik',password:1001,balance:10000},
      1002:{acno:1002,username:'shibil',password:1002,balance:10000},
    }

  
  // //userdefined function()// 4th execution

  acnoChange(event:any){
  //   //console.log(event);
  //   console.log(event.target.value);
  this.loginForm.value.acno=event.target.value;  //this.registerForm.value.acno - to call from registerForm and value
    }


  pswdChange(event:any){
  //   console.log(event.target.value);
  this.loginForm.value.pswd=event.target.value;
}
login(){
  //alert('login clicked');
  if(this.loginForm.valid){

  var acno=this.loginForm.value.acno;//1000
  var pswd=this.loginForm.value.pswd;//1000

    // var userDetails=this.ds.userDetails
  const result=this.ds.login(acno,pswd)

  
  .subscribe((result:any)=>{
    localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
    localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
    localStorage.setItem('token',JSON.stringify(result.token))
    alert(result.message)
    this.router.navigateByUrl('dashboard');
  },
  result=>{
    alert(result.error.message);
    this.router.navigateByUrl('')
  }
  )



}
}
}









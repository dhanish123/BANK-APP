import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
     accounts = 'enter yr acno here';
 
   // uname="";//properties
  // acno="";
  // pswd="";

  //register model
  registerForm=this.fb.group({//group
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]//array

    //control goes to register.html
  })

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }//dependency injection

  ngOnInit(): void {
  }

  register(){
    // alert("register clicked")
    // console.log(this.registerForm);
    if(this.registerForm.valid){
      //validation submitting button
    
    var uname=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;

    const result=this.ds.register(acno,uname,pswd,)

    .subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('');
    },
    result=>{
      alert(result.error.message)
      this.router.navigateByUrl('register');
    }
    )

    
    // if(result){
    //   alert("successfully registeres");
    //   this.router.navigateByUrl('')
    // }
    // else {
    //   alert("something went wrong");
    // }
    }
    else{
      console.log(this.registerForm.get('uname')?.errors);
      
    }
  }

}
function subscribe(arg0: (result: any)=>void){
  throw new Error('Function not implemented.');
}

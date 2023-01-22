// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DataService } from '../services/data.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {

//     //login name display
//     user="";
//     // deposite properties
//   acno="";
//   pswd="";
//   amount="";
//   // WITHDRAW PROPERTIES
//   acno1="";
//   pswd1="";
//   amount1="";
//   //Date and Time
//   SystemDate:any;

//   //delete properties
//   acno2="";

//   constructor(private ds:DataService,private router:Router) { 
//     this.user=this.ds.currentUser
//     this.SystemDate=new Date();
//     this.user=JSON.parse(localStorage.getItem('currentUser')|| '')
//   }

//   ngOnInit(): void {
//     // if(!localStorage.getItem('currentAcno')){
//     //   alert("please login first");
//     //   this.router.navigateByUrl('');
//     // }
//   }

// deposit()
// {
//   var acno=this.acno;
//   var pswd=this.pswd;
//   var amount=this.amount;
//   const result=this.ds.deposit(acno,pswd,amount)
//   .subscribe((result:any)=>{
//     alert(result.message);
//   },
//   result=>{
//     alert(result.error.message)
//   })
// }

// withdraw(){
//   var acno=this.acno1;
//   var pswd=this.pswd1;
//   var amount=this.amount1;
//   const result=this.ds.withdraw(acno,pswd,amount)
//   .subscribe((result:any)=>{
//     alert(result.message);
//   },
//   result=>{
//     alert(result.error.message)
//   })
// }
//   // logout(){
//   //   //remove login and user name
//   // }

// logout(){
//   //remove uname
// localStorage.removeItem('currentUser');
// localStorage.removeItem('currentAcno');
//   //navigate to login page
//   this.router.navigateByUrl('');
// }
// delete(){
//   this.acno2=JSON.parse(localStorage.getItem('currentAcno')||'');
// }
// onCancel(){
//   this.acno2="";
// }
// onDelete(event:any){
// alert(event)
// }
// }



import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   amount="";
   acno="";
   pswd="";

  //login name display
  user = '';

  //register model
  depositForm = this.fb.group({ //model
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]], //array  // * combinations
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]], //array
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]], //array
    // control goes to this.register.html
  })

  withdrawForm = this.fb.group({ //model
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]], //array  // * combinations
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]], //array
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]] //array
    // control goes to this.register.html
  })
  
  //withdraw
  //  amount1="";
  //  acno1="";
  //  pswd1="";

  SystemDate:any;


  constructor(private fb: FormBuilder, private ds: DataService, private router:Router) {
    this.user = this.ds.currentUser;
    this.SystemDate = new Date();
    if(localStorage.getItem('currentUser')){
    this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    console.log(localStorage);
    }

  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login first');
      this.router.navigateByUrl('');
    } 
  }


  deposit() {

    if (this.depositForm.valid) {


      var amount = this.depositForm.value.amount;
      var acno = this.depositForm.value.acno;
      var pswd = this.depositForm.value.pswd;

      this.ds.deposit(acno, pswd, amount)

      .subscribe((result: any)=>{
        alert(result.message)
      },
      result => { 
        alert(result.error.message)
 
     })

      // if (result) {
      //   alert(`${amount} the balnce is: ${result}`);
        
      // }
      
    }
  }

  withdraw() {

    if (this.withdrawForm.valid) {

      var amount = this.withdrawForm.value.amount1;
      var acno = this.withdrawForm.value.acno1;
      var pswd = this.withdrawForm.value.pswd1;

      this.ds.withdraw(acno, pswd, amount)

      .subscribe((result: any)=>{
        alert(result.message)
      },
      result => { 
        alert(result.error.message)
 
     })

    }
  }

  logout() {
    //remove uname
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('token');

    //navigate to login page
    this.router.navigateByUrl('');
  }

  delete(){
    this.acno=JSON.parse(localStorage.getItem('currentAcno') || '' );
  }

  onCancel(){
    this.acno="";
  }

  onDelete(event: any){
    // alert(event)
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message);
      // this.router.navigateByUrl('')
      this.logout()
    },
    result=>{
      alert(result.error.message)
    })
  }

}
function subscribe(arg0: (result: any) => void) {
  throw new Error('Function not implemented.');
}
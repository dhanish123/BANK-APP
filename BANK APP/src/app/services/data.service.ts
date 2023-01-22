import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';
//global http header object
const options={
  headers:new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
//display login name
currentUser:any;

//login account number display
currentAcno:any;

  userDetails:any ={//object of objects
    1000:{acno:1000,username:'Dhanish',password:1000,balance:10000,transaction:[]},
    1001:{acno:1001,username:'karthik',password:1001,balance:10000,transaction:[]},
    1002:{acno:1002,username:'shibil',password:1002,balance:10000,transaction:[]},


  }
  constructor(private http:HttpClient ) { //http injection
    // this.getDetails()//function call
  }//dependency injection

  //saveDetails()= to store data in the local storage

  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('database',JSON.stringify(this.userDetails));
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));

    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));

    }
  }

   //getDetails()-to get the data from the local storage

  //  getDetails(){
  //   if(localStorage.getItem('dataBase')){
  //     this.userDetails=JSON.parse(localStorage.getItem('dataBase')|| ' ');
  //   }
  //  }
  //  getcurrentUser(){
  //   if(localStorage.getItem('currentUser')){
  //     this.userDetails=JSON.parse(localStorage.getItem('currentUser')|| ' ');
  //   }
  // }
  // getcurrentAcno(){
  //   if(localStorage.getItem('currentAction')){
  //     this.userDetails=JSON.parse(localStorage.getItem('currentAction')|| ' ');
  //   }
  // }


//register api request
  register(acno:any,username:any,password:any){
   
    const data={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/register',data)
  }
  //login api request
  login(acno:any,pswd:any){
    const data={
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login',data);
  
    
  }
  getToken(){
    //fetch the token from localstorage
    const token=JSON.parse(localStorage.getItem('token')|| '')
    //generate request header
    let headers= new HttpHeaders()
    //append token inside the headers
    if(token){
     options.headers=headers.append('x-access-token',token)
    }
    return options
  }
  //deposit api request
  deposit(acno:any,pswd:any,amount:any){
    const data={
      acno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())
  
}

  withdraw(acno:any,pswd:any,amount:any){
    const data={
      acno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
  }
 getTransaction(acno:any){
  // return this.userDetails[acno]['transaction']
  const data={
    acno
  
  }
  return this.http.post('http://localhost:3000/transaction',data,this.getToken())
}
deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
}

 }
    
  


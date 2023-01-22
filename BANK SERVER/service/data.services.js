//import jwt
const jwt = require('jsonwebtoken')

//import db
const db = require('./db')

userDetails ={//object of objects
    1000:{acno:1000,username:'Dhanish',password:1000,balance:10000,transaction:[]},
    1001:{acno:1001,username:'karthik',password:1001,balance:10000,transaction:[]},
    1002:{acno:1002,username:'shibil',password:1002,balance:10000,transaction:[]},
}

const register=(acno,username,password)=>{
 return db.User.findOne({acno}) //port 27017

  .then(User=>{
    if(User){
      return {
        statusCode:401,
        status:false,
        message:'user already registered'
      }
    }
    else{
      const newUser=new db.User({
        acno,
        username,
        password,
        balance:0,
        transaction:[]
      })
      newUser.save()//to save in mongodb
      return {
            statusCode:200,
            status:true,
            message:'sucessfully registered'
          }

    }
  })

  

    // if(acno in userDetails){
    //   return {
    //     statusCode:401,
    //     status:false,
    //     message:'user already registered'
    //   }
    // }
    // else {
    //   userDetails[acno]={
    //     acno,
    //     username,
    //     password,
    //     balance:0,
    //     transaction:[]

    //   }

    //   console.log(userDetails);
    //   // this.saveDetails();//function call
      
    //   return {
    //     statusCode:200,
    //     status:true,
    //     message:'sucessfully registered'
    //   }
    //   }
     }
    const login=(acno,pswd)=>{

    return  db.User.findOne({
      acno,
      password:pswd
    })
    .then(User=>{
      if(User){
      currentUser=User.username
      currentAcno=acno;
      //token generate
      const token=jwt.sign({currentAcno:acno},'superkey2020')
      return { 
     statusCode:200,
      status:true,
      message:'Login Successful',
      currentUser,
      currentAcno,
      token
    }}
    else{
      return {
        statusCode:401,
        status:false,
        message:'incorrect password or username'
      }
    }
   })
  
        if(acno in userDetails){
          if(pswd==userDetails[acno]['password']){
            currentUser=userDetails[acno]['username']
            currentAcno=acno;
            //token generate
            const token=jwt.sign({currentAcno:acno},'superkey2020')
                             return { 
                            statusCode:200,
                             status:true,
                             message:'Login Successful',
                             currentUser,
                             currentAcno,
                             token
                           }
          }
          else{
            // alert('');
            return {
                statusCode:401,
                status:false,
                message:'incorrect password'
              }
          }
        }
          else{
            // alert('')
            return {
                statusCode:401,
                status:false,
                message:'invalid user'
              }
          }
        
      }

      const deposit=(acno,pswd,amt)=>{
      var amount=parseInt(amt);
      return db.User.findOne({acno,password:pswd})
      .then(User=>{
        if(User){
         User.balance+=amount;
          User.transaction.push({
            type:'Credit',
            amount
          })
          User.save()
          console.log(userDetails);
         return { 
           statusCode:200,
            status:true,
            message:`${amount} is deposited and new balance is ${User.balance}`
         
          }
        }
        else{
          return {
            statusCode:401,
            status:false,
            message:'incorrect password or username'
          }
        }
      })
        if(acno in userDetails){
         if(pswd==userDetails[acno]['password']){
           userDetails[acno]['balance']+=amount;
           userDetails[acno]['transaction'].push({
             type:'Credit',
             amount
           })
           console.log(userDetails);
          return { 
            statusCode:200,
             status:true,
             message:`${amount} is deposited and new balance is ${userDetails[acno]['balance']}`
          
           }
   
         }
         else{
        //    alert('');
           return {
            statusCode:401,
            status:false,
            message:'incorrect password'
          }
         }
   
        }
        else{
        //  alert('');
         return {
            statusCode:401,
            status:false,
            message:'invalid user'
          }
     }
    }
    
   const withdraw=(acno,pswd,amt)=>{
      var amount=parseInt(amt);
      return db.User.findOne({acno,password:pswd})
      .then(User=>{
        if(User){
          User.balance-=amount;
          User.transaction.push({
            type:'Debit',
            amount
          })
          User.save();
          console.log(userDetails);
          return { 
           statusCode:200,
            status:true,
            message:`${amount} is debited and new balance is ${User.balance}`
          }
        }
        else{
          return {
            statusCode:401,
            status:false,
            message:'insufficient balance'
          }
        }
      })
      if(acno in userDetails){
  
       if(pswd==userDetails[acno]['password']){
        
        if(userDetails[acno]['balance']>amount)
        {
         userDetails[acno]['balance']-=amount;
         userDetails[acno]['transaction'].push({
           type:'Debit',
           amount
         })
         console.log(userDetails);
         return { 
          statusCode:200,
           status:true,
           message:`${amount} is debited and new balance is ${userDetails[acno]['balance']}`
        
         }
 
  
  
       }
       else{
        // alert('');
        return {
          statusCode:401,
          status:false,
          message:'insufficient balance'
        }
       }
      }
       else{
        //  alert('');
         return {
          statusCode:401,
          status:false,
          message:'incorrect password'
        }
       }
       }
      
      else{
       alert('invalid user');
       return {
        statusCode:401,
        status:false,
        message:'invalid user'
      }
      }
   }

   const getTransaction=(acno)=>{
    return db.User.findOne({acno})
    .then(User=>{
      if(User){
        return { 
          statusCode:200,
           status:true,
           transaction:User['transaction']
          
      }
    }
    else {
      return { 
        statusCode:402,
         status:false,
         message:'user not found'
      }
    }
    })
    return { 
      statusCode:200,
       status:true,
       transaction:userDetails[acno]['transaction']
    
     }
    }

     //deleteAcc
     const deleteAcc=(acno)=>{
      return db.User.deleteOne({acno})
      .then(user=>{
        if(user){
          return{
            statusCode:200,
            status:true,
            message:'user deleted'
          }
        }
        else{
          return{
            statusCode:402,
            status:false,
            message:'user not found'
        }
      }
      })
    }
   
  
  //export

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }
//server creation

//1.import express

const express = require('express')

//import dataservices
const dataservice = require('./service/data.services')

//import jwt
const jwt = require('jsonwebtoken')

//import cors 
const cors = require('cors')

//2.create an app using express

const app = express()

//give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200', 'http://192.168.1.87:8080']
}))
//to parse  json data from request body
app.use(express.json())

//3.create port number

app.listen(3000, ()=>{
    console.log('Server listening on port:3000');
})

//application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware
const  jwtMiddleware = (req,res,next)=>{
    try{
        const token=req.headers['x-access-token'];
    //verify the token - verify()
    console.log('Router specific middleware');
    const data=jwt.verify(token,'superkey2020')
    console.log(data);
    next();
    }
    catch{
        //422 - unprocessable entity (unable to process)
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"plz login first"
        })
    }
}


//4.Resolving HTTP request

// //GET Request---------------------get or display data
app.get('/',(req,res)=>{
    res.send('GET METHODS');
})

// //POST Request-----------------create data
app.post('/',(req,res)=>{
res.send('POST METHODS');
})

// //DELETE Request----------------deleta data
app.delete('/',(req,res)=>{
    res.send('DELETE METHODS');
})

// //PUT Request------------COMPLETE UPDATION
app.put('/',(req,res)=>{
    res.send('PUT METHODS')
})

// //PATCH Request------------PARTIAL UPDATION
app.patch('/',(req,res)=>{
    res.send('PATCH METHODS')
})

//API Request / call

//login
//registration
//deposite
//withdraw
//transaction history

//reolving registration request - post
app.post('/register',(req,res)=>{
    console.log(req.body);
    dataservice.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
            res.status(result.statusCode).json(result)
    })
    
    // .getHeaderNames(result=>{
    //     res.status(result.statusCode).json(result)
    })
    // if(result)
    // {
    //     res.send('sucessfully registered');
    // }
    // else{
    //     res.send("user registration failed");
    // }
   
// })

//resolving login Request - post
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservice.login(req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   
})

//resolving deposit Request - post
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
     dataservice.deposit(req.body.acno,req.body.pswd,req.body.amount)
     .then(result=>{
        res.status(result.statusCode).json(result)
     })
    
})

//resolving withdraw request - post
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservice.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

//resolving transaction request - post
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
     dataservice.getTransaction(req.body.acno)
     .then(result=>{
    res.status(result.statusCode).json(result)
     })
})

app.delete('/deleteAcc/:acno',(req,res)=>{
    dataservice.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

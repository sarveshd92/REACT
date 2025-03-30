const express= require("express");
const bcrypt=require('bcrypt')
const db=require("./UTILS/dbconnect");
const { User } = require("./Models/UserModel");
const app =express();
app.use(express.json());
require('dotenv').config(); 
app.get('/',function(req,res){
    res.send("hello user welcome to initial page ")
})
app.post('/signup',async function(req,res){
   try {
    const{username,password,email} = req?.body;
    console.log(email)
            const searchdata=await User.find({email:email});
            console.log(searchdata)
            if(searchdata.length>0){
                throw new Error("Email already exists please try another email")
            }
           
       const data=await new User({
            username:username,
            password:password,
            email:email,
        })
        await data.hashpassword();
        await data.save();
        // await data.save();
      
       
        console.log("data saved",data);
res.status(201).json({message:"success"})

   } 
   catch (error) {
    res.status(400).json({
        message:error?.message
    })
   }
})

app.post('/signin',async function(req,res){
    const {username,password}=req.body;
    
 try {
       const isuser=await User.findOne({username:username});
       console.log(password)
       let pass = password.toString()
       if(isuser){
           const isvalid =await isuser.comparepassword(pass);
           console.log(isvalid)
       
           if(isvalid){
               res.json("signed in ")
           }
           else{
            res.status(401).json("invalid credentials")
           }
        }
 } catch (error) {
    res.json({message :`invalid credentials->${error?.message}`})
    
 }
})

app.listen(3000,async function(req,res){
    try {
    await db.dbconnect();
    } catch (error) {
        console.log("not connected->",error?.message)
    } 

})

app.use(function (error, req, res, next) {
    console.error("Error occurred:", error.message);
    res.status(500).json({
        message: `The error you are facing: ${error.message}`,
    });
});

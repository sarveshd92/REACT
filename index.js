const express= require("express");
const db=require("./UTILS/dbconnect");
const { User } = require("./Models/UserModel");
const app =express();
app.use(express.json());
require('dotenv').config({path:__dirname+"/.env"}); 
app.get('/',function(req,res){
    res.send("hello user welcome")
})
app.get('/signup',async function(req,res){
   try {
    const{username,password,email} = req?.body;
            const searchdata=await User.find({email:email});
            if(searchdata){
                throw new Error("Email already exists please try another email")
            }
       const data=await User.create({
            username:username,
            password:password,
            email:email,
        })
        console.log("data saved",data);
res.status(201).json({message:"success"})

   } 
   catch (error) {
    res.status(400).json({
        message:error?.message
    })
   }
})

app.get('/signin',function(req,res){
    res.send("hello user welcome")
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

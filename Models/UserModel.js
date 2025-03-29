const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true,
    }
    ,
    email:{
        type:String,
        unique:true,
        required:true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please provide a valid email address', // Error message
          ],
        
    },
    password:{
        type:String,
        required:true,
    }
})
userSchema.methods.hashpassword=async function(){
         this.password = await bcrypt.hash(this.password, 8);
}
userSchema.methods.comparepassword=async function(password){
   const istrue=  await bcrypt.compare(password,this.password);
   return istrue;
}
const User=mongoose.model('Users',userSchema);
module.exports={
    User,
   
}
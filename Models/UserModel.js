const mongoose=require('mongoose');
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
           this.password = await bcrypt.hash(this.password, 20);
}
const User=mongoose.model('Users',userSchema);
module.exports={
    User,
   
}
const mongoose=require("mongoose");

 const dbconnect= async function(){
        try {
            //  await mongoose.connect("mongodb+srv://sarveshdeshpande52:cCNeWwFmPB7Y544M@youtube.vohybo7.mongodb.net/?retryWrites=true&w=majority&appName=YOUTUBE");
           await mongoose.connect(process.env.Mongo_url)
            console.log("db connected !!");
        }
        catch(err){
                console.log("db not connected!!")
                throw new Error("Database connection failed.")
        }
    }
module.exports={
    dbconnect,
};
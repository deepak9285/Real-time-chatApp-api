const mongoose=require("mongoose");
require("dotenv").config();
exports.db_connect=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("db connected successfully");    
    })
    .catch((error)=>{
        console.log(error);
        console.log("connection issues with database");
        process.exit();
    })
}
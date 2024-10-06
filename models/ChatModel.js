const mongoose=require("mongoose");
const ChatSchema=mongoose.Schema({
    chatName:{
        type:String,
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    latestmessages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ],

})
const Chat=mongoose.model("Chat",ChatSchema);
module.exports=Chat;
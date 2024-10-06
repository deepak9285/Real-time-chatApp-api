const asyncHandler=require("express-async-handler");
const User=require('../models/UserModel');
const Chat = require("../models/ChatModel");
const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        console.log("UserId param not sent with request");
        return res.status(400);
    }
    var isChat=await Chat.find({
        users: { $all: [req.user._id, userId] }
    }).populate("users","-password")
    .populate("latestMessage");
    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name email",
    });
    if(isChat.length>0){
        res.send(isChat[0]);
    }else{
        var chatData={
            chatName:"sender",
            users:[req.user._id,userId],
        };
        try{
            const createChat=await Chat.create(chatData);
            const FullChat=await Chat.findOne({_id:createChat._id}).populate(
                "users","-password"
            );
            res.status(200).json(FullChat);
            console.log(FullChat);

        }
        catch(error){
            res.status(400);
            throw new Error(error.message);
        }

    }
});


const fetchChats = asyncHandler(async (req, res) => {
  try {
    console.log("Fetch chats API:", req.user);

    // Correcting the query to use $in instead of $eleMatch
    await Chat.find({
      users: { $in: [req.user._id] }, // Using $in to match the user ID in the users array
    })
      .populate("users", "-password")
    //   .populate("groupAdmin", "-password")
      .populate("latestmessages")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestmessages.sender",
          select: "name email",
        });
        res.status(200).send(results);
        console.log(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { fetchChats,accessChat };

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user");
const ChatRoutes = require("./routes/chatRoutes");
const AiChatRoutes=require("./routes/AiChatRoutes");
const MessageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
require("dotenv").config();
const { db_connect } = require("./config/db");
db_connect();
app.use(cors({ origin: "*", methods: "GET,POST" }));
app.get("/", (req, res) => {
  res.json("Api is running");
});
app.use(express.json());


app.use((err, req, res, next) => {
  if (err.message.includes('GoogleGenerativeAIResponseError')) {
    console.error('Google AI Service Error:', err);
    res.status(500).json({ message: 'There was an error with the Google AI service. Please try again later.' });
  } else {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});
app.use("/aiChat",AiChatRoutes);
app.use("/users", UserRoutes);
app.use("/chat", ChatRoutes);
app.use("/message", MessageRoutes);
app.listen(process.env.PORT || 5000, console.log("server is running"));

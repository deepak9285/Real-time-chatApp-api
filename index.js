const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user");
const ChatRoutes = require("./routes/chatRoutes");
const MessageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
require("dotenv").config();
const { db_connect } = require("./config/db");
db_connect();
app.use(cors({ origin: "http://localhost:3000" }));
app.get("/", (req, res) => {
  res.json("Api is running");
});
app.use(express.json());
app.use("/users", UserRoutes);
app.use("/chat",ChatRoutes);
app.use("/message", MessageRoutes);
app.listen(process.env.PORT || 5000, console.log("server is running"));

const express = require("express");
const router = express.Router();
//const authController=require('../controllers/auth')

const messageController = require("../controllers/messages");
const { protect } = require("../middleware/authmiddleware");

router.route("/").post(protect, messageController.sendMessage);
router.route("/:chat_id").get(protect, messageController.allMessages);

module.exports = router;

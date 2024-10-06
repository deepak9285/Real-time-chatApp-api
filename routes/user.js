const express=require("express");
const router=express.Router();
const {signup, login ,fetchAllUserController}=require("../controllers/auth");
const {protect}=require("../middleware/authmiddleware");

router.post("/signup",signup);
router.post("/login",login);
router.get("/fetchUsers",protect,fetchAllUserController);
module.exports=router;
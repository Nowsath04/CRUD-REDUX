const express = require("express");
const { Register, Login, Alluser, Logout, Profile, ForgotPassWord, resetPassword } = require("../controllers/userController");
const { JwtVerify } = require("../middleware/JwtVerify");


const router = express.Router();

router.post("/register", Register)
router.post("/login", Login)
router.get("/alluser", Alluser)
router.get("/logout", Logout)
router.get("/profile", JwtVerify, Profile)
router.post("/forgot-password", ForgotPassWord)
router.post("/reset-password/:id/:token", resetPassword)


module.exports = router;
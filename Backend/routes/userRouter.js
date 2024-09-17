const express = require("express");
const { Register, Login, Alluser, Logout, Profile } = require("../controllers/userController");
const { JwtVerify } = require("../middleware/JwtVerify");


const router = express.Router();

router.post("/register", Register)
router.post("/login", Login)
router.get("/alluser", Alluser)
router.get("/logout", Logout)
router.get("/profile", JwtVerify, Profile)


module.exports = router;
const asyncHandler = require("../middleware/trycatch");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { jwt } = require("../utils/Jwt");



// regiser

exports.Register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }
        const bcryptPassword = await bcrypt.hash(password, 10);
        const register = await userModel.create({
            name: name,
            password: bcryptPassword,
            email: email
        })
        jwt(register, res)
    } catch (error) {
        console.log(error);
    }
});

// Login

exports.Login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" })
    }
    jwt(user, res);
});

// All Users

exports.Alluser = asyncHandler(async (req, res) => {

    const Allusers = await userModel.find()
    res.status(200).json({ Allusers })

});

// Logout

exports.Logout = asyncHandler(async (req, res) => {

    try {
        res.clearCookie("token").status(200).json({
            message: "Logout Successfully"
        })
    } catch (error) {
        console.log(error);
    }
});

// profile

exports.Profile = asyncHandler(async (req, res) => {

    const user = req.user;
    console.log(user);
    try {
        res.status(200).json({
            message: "User profile successfully",
            user,
        });
    } catch (error) {
        console.log(error)
    }

});

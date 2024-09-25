const asyncHandler = require("../middleware/trycatch");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { jwt } = require("../utils/Jwt");
var nodemailer = require('nodemailer');
const JWT = require("jsonwebtoken");



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
    try {
        res.status(200).json({
            message: "User profile successfully",
            user,
        });
    } catch (error) {
        console.log(error)
    }
});



exports.ForgotPassWord = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const checkMail = await userModel.findOne({ email });

    if (!checkMail) {
        return res.status(404).json({ message: "Invalid email" });
    }

    const token = JWT.sign({ id: checkMail._id }, process.env.JWTSECRET, { expiresIn: "1d" });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILERUSER,
            pass: process.env.NODEMAILERPASS
        }
    });

    var mailOptions = {
        from: process.env.NODEMAILERUSER,
        to: email,
        subject: 'Password Reset Request',
        text: `You can reset your password by clicking the link below: \n${process.env.FRONTEND_URL}/reset-password/${checkMail._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(400).json({
                message: 'Error sending email',
                error: error.message
            });
        } else {
            return res.status(200).json({
                message: 'Email sent successfully',
                info: info.response
            });
        }
    });
});


exports.resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { id, token } = req.params;


    try {
        const decoded = JWT.verify(token, process.env.JWTSECRET);

        const user = await userModel.findById(id);
        if (!user || user._id.toString() !== decoded.id) {
            return res.status(400).json({ message: "Invalid token or user" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Token is invalid or expired" });
    }
});

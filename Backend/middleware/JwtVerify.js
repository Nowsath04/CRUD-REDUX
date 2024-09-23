const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

exports.JwtVerify = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(new ErrorHandler("You are Unauthorized", 401));
        }

        jwt.verify(token, process.env.JWTSECRET, async (err, decoded) => {
            if (err) {
                return next(new ErrorHandler("Invalid Token", 403));
            }
            req.user = await userModel.findById(decoded.userid);
            if (!req.user) {
                return next(new ErrorHandler("User not found", 404));
            }
            next();
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Server Error", 500));
    }
};

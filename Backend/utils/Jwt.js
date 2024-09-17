const jwt = require("jsonwebtoken");

exports.jwt = async (user, res) => {
    try {
        const token = await jwt.sign({ userid: user._id, }, "crud", {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).status(201).json({
            user: user,
            token: token
        });
    } catch (error) {
        console.log(error);
    }
}
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Datas`,
        }
    ]

}, {
    timestamps: true
});


const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
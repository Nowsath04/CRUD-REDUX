const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Email: {
        type: String
    },
    DOB: {
        type: String
    },
    Gender: {
        type: String
    },
    Role: {
        type: String
    },
    Mobile: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Users`,
    },
}, {
    timestamps: true
});

const dataModel = mongoose.model("Datas", dataSchema);

module.exports = dataModel;

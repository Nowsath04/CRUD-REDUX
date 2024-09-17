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
}, {
    timestamps: true
});

const dataModel = mongoose.model("Data", dataSchema);

module.exports = dataModel;
const mongoose = require('mongoose');


const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDb connected successfully`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = DBConnection;
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.connectDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, ()=> console.log("Connected to db!"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;
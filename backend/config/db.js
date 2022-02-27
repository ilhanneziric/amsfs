// require('dotenv').config({ path: "..env" });
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, ()=> console.log("Connected to db!"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ilhan:123@cluster0.13amf.mongodb.net/amsfs?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, ()=> console.log("Connected to db!"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}



module.exports = connectDB;
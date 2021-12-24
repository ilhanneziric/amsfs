require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
//const bodyParser = require('body-parser');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server runing on PORT: ${PORT}`));
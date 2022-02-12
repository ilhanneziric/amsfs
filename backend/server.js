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

const mjesecRoutes = require('./routes/mjesecRoutes');
const danRoutes = require('./routes/danRoutes');
const tretmanRoutes = require('./routes/tretmanRoutes');
const terminRoutes = require('./routes/terminRoutes');

app.use('/api/mjesec', mjesecRoutes);
app.use('/api/dan', danRoutes);
app.use('/api/tretman', tretmanRoutes);
app.use('/api/termin', terminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server runing on PORT: ${PORT}`));



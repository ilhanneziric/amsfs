require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
//const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')

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

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }
});

io.on('connection', (socket) => {
    // console.log('user connected: ' + socket.id);

    socket.on('posalji_zahtjev', () => {
        // console.log('stigao zahtjev');
        socket.to('admin').emit('prihvati_zahtjev');
    });

    socket.on('register_admin', (data) => {
        socket.join(data);
        // console.log(`user with ID: ${socket.id} register as admin key: ${data}`);
    });

    socket.on('disconnect', () => {
        // console.log('user disconnected: ', socket.id);
    });
});

server.listen(PORT, ()=>console.log(`Server runing on PORT: ${PORT}`));



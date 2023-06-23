const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);

const OPTIONS = { cors: { origin: '*' } };
const PORT = process.env.PORT || 3003;

const io = new Server(httpServer, OPTIONS);

const socketHandlers = require('./socket/handlers');

const wsNameSpace = io.of('/ws');
wsNameSpace.on('connection', (socket) => {
  socketHandlers.onConnection(io, socket);
});

const cors = require('cors');

// middleware
app.use(cors());
app.use(express.static('../client/dist'));

// controllers
const songController = require('./controllers/songController');

// routes
app.get('/', songController.client);
app.get('/songs', songController.songs);
app.get('/music/:name', songController.singleSong);

// start server
httpServer.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { client, songs, singleSong } from './controllers/song-controller';

const app = express();
const httpServer = createServer(app);

const OPTIONS = { cors: { origin: '*' } };
const PORT = process.env.PORT || 3003;

const io = new Server(httpServer, OPTIONS);

import { onConnection } from './socket/handlers';

const wsNameSpace = io.of('/ws');
wsNameSpace.on('connection', (socket) => {
  onConnection(io, socket);
});

// middleware
app.use(cors());
app.use(express.static('../client/dist'));

// routes
app.get('/', client);
app.get('/songs', songs);
app.get('/music/:name', singleSong);

// start server
httpServer.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

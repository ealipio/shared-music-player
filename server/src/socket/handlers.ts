function songActions(io, socket) {
  const count = io.engine.clientsCount;
  console.log(`id: ${socket.id} Total Connected ${count}`);

  const pause = (audioInfo) => {
    socket.broadcast.emit('server::audio::pause', audioInfo);
  };

  const play = (audioInfo) => {
    socket.broadcast.emit('server::audio::play', audioInfo);
  };

  const playIndex = (playIndex) => {
    // @todo: fix passing the playIndexInServer
    //playIndexInServer = playIndex;
    socket.broadcast.emit('server::audio::playIndex', playIndex);
  };

  const seeked = (currentTime) => {
    socket.broadcast.emit('server::audio::seek', currentTime);
  };

  socket.on('client::audio::paused', pause);
  socket.on('client::audio::play', play);
  socket.on('client::audio::playIndex', playIndex);
  socket.on('client::audio::seeked', seeked);
}

//To broadcast to all connected clients except one (socket)
//socket.broadcast.emit('from_server', data);
//To broadcast to all connected clients from the server:
//wsNameSpace.emit('from_server', data);

export const onConnection = (io, socket) => {
  songActions(io, socket);
};

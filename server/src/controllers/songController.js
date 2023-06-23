const path = require('path');
const ms = require('mediaserver');

const { readFile } = require('../services/songService');
let playIndex = 1;

exports.singleSong = (req, res) => {
  const SONGS_DIRECTORY = '../../music';
  const song = path.join(__dirname, SONGS_DIRECTORY, req.params.name);
  ms.pipe(req, res, song);
};

exports.client = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
};

exports.songs = (_, res) => {
  const pathToFile = path.join(__dirname, '../songs.json');
  readFile(pathToFile, playIndex).then((audioList) => {
    const response = {
      audioList,
      playIndex,
    };
    res.status(200).json(response);
  });
};

//const [IP_SERVER] = req.socket.localAddress.split(':').slice(-1);

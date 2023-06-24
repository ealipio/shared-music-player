import path from 'path';
import ms from 'mediaserver';
import { Request, Response } from 'express';

import readFile from '../services/song-service';
let playIndex = 1;

export const singleSong = (req: Request, res: Response) => {
  const SONGS_DIRECTORY = '../../music';
  const song = path.join(__dirname, SONGS_DIRECTORY, req.params.name);
  ms.pipe(req, res, song);
};

export const client = (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
};

export const songs = (_req: Request, res: Response) => {
  const pathToFile = path.join(__dirname, '../songs.json');
  readFile(pathToFile).then((audioList) => {
    const response = {
      audioList,
      playIndex,
    };
    res.status(200).json(response);
  });
};

//const [IP_SERVER] = req.socket.localAddress.split(':').slice(-1);

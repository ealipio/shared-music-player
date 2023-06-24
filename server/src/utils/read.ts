import path from 'path';
import fs from 'fs';

const buildSongsContent = ({ files }) => {
  console.log(files);
  return files.map((song) => {
    const { name } = path.parse(song);
    const [singer] = name.split('-');

    return {
      name,
      singer,
      cover: '',
      musicSrc: `/songs/${song}`,
    };
  });
};

const writeSongsFile = ({ audioList, fileName }) => {
  const content = JSON.stringify(audioList);
  fs.writeFile(path.join(__dirname, fileName), content, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('file written successfully');
  });
};
// :::::::::::::::::::::::::::::::::::::::::::::::::

const songsDirectory = path.join(__dirname, '../songs');
// reading file content
fs.readdir(songsDirectory, (err, files) => {
  if (err) {
    throw err;
  }
  const audioList = buildSongsContent({ files });
  // write file
  writeSongsFile({ audioList, fileName: 'songs.json' });
});
//::::::::::::::::::::::::::::::::::::::::::::::::::::::

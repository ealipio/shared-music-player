import { useEffect, useState } from 'react';

import { type ReactJkMusicPlayerAudioListProps as IAudioList } from 'react-jinke-music-player';

interface IAudioConfig {
  audioList: IAudioList[];
  playIndexFromServer: number;
}

const INITIAL_CONFIG = {
  audioList: [],
  playIndexFromServer: 0,
};

const useSongs = (serverUri: string) => {
  const [audioConfig, setAudioList] = useState<IAudioConfig>(INITIAL_CONFIG);

  useEffect(() => {
    const fetchAudioList = async (server: string) => {
      const response = await fetch(`http://${server}/songs`);
      const { audioList, playIndex } = await response.json();
      setAudioList({ audioList, playIndexFromServer: playIndex });
    };

    if (serverUri) {
      fetchAudioList(serverUri);
    }
  }, [serverUri]);

  return audioConfig;
};

export default useSongs;

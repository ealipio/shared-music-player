import { FC, useState, useEffect } from 'react';

import ReactJkMusicPlayer, {
  type ReactJkMusicPlayerAudioListProps,
  type ReactJkMusicPlayerProps,
  type ReactJkMusicPlayerInstance as IAudio,
  type ReactJkMusicPlayerAudioInfo as AudioInfo,
} from 'react-jinke-music-player';

import { type Socket } from 'socket.io-client';

import 'react-jinke-music-player/assets/index.css';

export interface IMediaInfoProps {
  socket: Socket | undefined;
  defaultPlayIndex: number;
  audioList: ReactJkMusicPlayerAudioListProps[];
}

const Player: FC<IMediaInfoProps> = ({
  socket,
  defaultPlayIndex,
  audioList,
}) => {
  const [audioInstance, setAudio] = useState<IAudio>();

  useEffect(() => {
    if (socket?.connected && audioInstance) {
      socket.on('server::audio::pause', () => {
        audioInstance.pause();
      });
      socket.on('server::audio::play', () => {
        audioInstance.play();
      });

      socket.on('server::audio::playIndex', (playIndex: number) => {
        audioInstance.playByIndex && audioInstance.playByIndex(playIndex);
      });

      socket.on('server::audio::seek', (currentTime: number) => {
        audioInstance.currentTime = currentTime;
      });
    }

    return () => {
      if (socket?.connected) {
        // remove all listeners
        socket.off();
      }
    };
  }, [socket, audioInstance]);

  if (!socket?.connected) {
    return <h3>Disconnected.</h3>;
  }

  const handleAudioInstance = (instance: IAudio) => {
    instance.playByIndex && instance.playByIndex(defaultPlayIndex);
    // todo: save current progress in the other clients
    // and send it to server
    // when new user connected, seek to that time
    setAudio(instance);
  };

  const handlePause = (audioInfo: AudioInfo) => {
    socket.emit('client::audio::paused', audioInfo);
  };
  const handleAudioSeeked = (audioInfo: AudioInfo) => {
    socket.emit('client::audio::seeked', audioInfo?.currentTime);
  };

  const handleAudioPlay = (audioInfo: AudioInfo) => {
    socket.emit('client::audio::play', audioInfo);
  };

  const handlePlayIndexChange = (playIndex: number) => {
    socket.emit('client::audio::playIndex', playIndex);
  };

  const options: ReactJkMusicPlayerProps = {
    audioLists: audioList,
    defaultPlayIndex: defaultPlayIndex,
    mode: 'full',
    preload: true,
    theme: 'auto',
    remove: false,
    remember: true,
    showReload: false,
    toggleMode: false,
    showDownload: false,
    autoHiddenCover: true,
    showMediaSession: true,
    showThemeSwitch: false,
    loadAudioErrorPlayNext: false,
    volumeFade: { fadeIn: 500, fadeOut: 500 },
    // mobileMediaQuery: '(max-width: 1920px)',
    autoPlayInitLoadPlayList: true,
  };

  return (
    <>
      <h3 className="text-4xl p-4">Share your Music :)</h3>
      <ReactJkMusicPlayer
        {...options}
        onAudioPause={handlePause}
        onPlayIndexChange={handlePlayIndexChange}
        onAudioSeeked={handleAudioSeeked}
        onAudioPlay={handleAudioPlay}
        getAudioInstance={handleAudioInstance}
      />
    </>
  );
};

export default Player;

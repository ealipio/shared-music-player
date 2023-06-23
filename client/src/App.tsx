import { useState } from 'react';
import { type Socket } from 'socket.io-client';

import MediaInfo from './components/media-info';
import Player from './components/player';
import useSongs from './hooks/useSongs';

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [serverUri, setUri] = useState<string>('');
  const [errorMessage, setError] = useState<string>('');
  const { audioList, playIndexFromServer } = useSongs(serverUri);

  const getSocket = (socket: Socket, serverUri: string) => {
    setSocket(socket);
    setUri(serverUri);
  };

  const handleError = (message: string) => {
    setError(message);
    if (message) {
      setUri('');
    }
  };

  if (serverUri === '') {
    return (
      <>
        {errorMessage && (
          <div className="w-auto bg-pink-500 text-white font-semibold text-2xl antialiased p-4">
            {errorMessage}
          </div>
        )}
        <MediaInfo onSendSocket={getSocket} onSetError={handleError} />
      </>
    );
  }

  if (serverUri.length > 0 && audioList.length === 0) {
    return <h3>No Songs</h3>;
  }

  return (
    <div className="bg-gray-600 text-white h-screen">
      {errorMessage && (
        <div className="w-auto bg-pink-500 text-white font-semibold text-2xl antialiased p-4">
          {errorMessage}
        </div>
      )}
      <Player
        socket={socket}
        defaultPlayIndex={playIndexFromServer}
        audioList={audioList}
      />
    </div>
  );
}

export default App;

import { FC, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

export interface IPlayerProps {
  onSendSocket: (socket: Socket, serverUri: string) => void;
  onSetError: (message: string) => void;
}

const MediaInfo: FC<IPlayerProps> = ({ onSendSocket, onSetError }) => {
  const [serverUri, setServerUri] = useState<string>(window.location.host);

  const handleIPAddressChange = (e: React.FormEvent<HTMLInputElement>) => {
    setServerUri(e.currentTarget.value);
  };

  const onTryToConnect = () => {
    const socket = io(`ws://${serverUri}/ws`);
    if (socket) {
      socket.on('connect', () => {
        onSendSocket(socket, serverUri);
        onSetError('');
      });

      socket.io.on('error', (error) => {
        onSetError(error.message);
        // remove all listeners
        socket.io.off();
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onTryToConnect();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-10">
      <input
        className="border-sky-600 border-2 rounded-md p-1 mx-2"
        type="text"
        autoFocus={true}
        placeholder="ipaddress:port"
        value={serverUri}
        onChange={handleIPAddressChange}
      />
      <button
        className="border-2 bg-slate-600 text-white px-2 rounded-md hover:bg-slate-900"
        onClick={onTryToConnect}
      >
        connect
      </button>
    </form>
  );
};

export default MediaInfo;

## Share player:

using socket io I build this player,

0. Build the frontend using pnpm build
1. then you have to start the server
2. go to [host:port] and that's it. by default I set the port to 3003

```
cd client
pnpm build
cd ../server
node server.js
```

### use cases:

1. In a party, connect the server to the bluetooth speakers
2. in a LAN whoever wants to change the music just have to connect his device to the server suing a browser and then is able to play/stop/seek music there
3. another use case similar is if you are in a motorcycle with your babe and want to listen the same music even if you do not have internet connection since one of the phone has to be the server you are going to share the music from one of the cellphones. the device with the music has to be the server, then you just share your connection has a hot-spot, phones connected to the server phone will be able to access to the player but, you need to install nodejs and transfer this repository to your phone, I recommend using xTerminal for that. install git, then nodeJS, clone the repo and go to step zero.

enjoy :)

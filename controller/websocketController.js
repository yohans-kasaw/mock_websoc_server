import WebSocket from 'ws';
import { getRandomInt } from '../helpers/utils.js';
import createRandomJson from '../helpers/createRandomJson.js';


function startWebSocketServer(wss) {

  wss.on('connection', (ws) => {
    console.log('New client connected.');

    let isSubscribed = false;
    let sendTokenTimeout = null;

    const sendToken = () => {
      if (ws.readyState !== WebSocket.OPEN) {
        return;
      }

      const randomToken = createRandomJson();

      console.log('Sending token---', randomToken.data.Token.id, randomToken.data.Token["bonding_progress"]);
      ws.send(JSON.stringify(randomToken));

      const nextInterval = getRandomInt(4000, 4001); // 2 to 5 seconds
      sendTokenTimeout = setTimeout(sendToken, nextInterval);
    };

    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        if (
          parsedMessage.action === 'subscribe' &&
          parsedMessage.type === 'new_token'
        ) {
          if (!isSubscribed) {
            isSubscribed = true;
            console.log('Client subscribed to new_token.');
            sendToken(); // Start sending tokens
          }
        }
      } catch (err) {
        console.error('Error parsing message from client:', err.message);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected.');
      isSubscribed = false;
      if (sendTokenTimeout) {
        clearTimeout(sendTokenTimeout);
      }
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err.message);
    });
  });
}


export default startWebSocketServer;

import { WebSocketServer } from "ws";
import { websocketConfig } from "./config.js";
import startWebSocketServer from "./controller/websocketController.js";
import http from "http";


function getDelayedWss(delayMs = 5000) {
  const server = http.createServer();
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    console.log("Received upgrade request.");

    // Simulate delay before accepting the connection
    console.log(`Delaying connection for ${delayMs} ms.`);

    setTimeout(() => {
      // Proceed with the WebSocket handshake after the delay
      wss.handleUpgrade(request, socket, head, (ws) => {
        // Emit the 'connection' event for the established WebSocket
        wss.emit("connection", ws, request);
      });
    }, delayMs);
  });

  // Start the server
  return { server, wss };
}

 //Initialize the WebSocket server using the named WebSocketServer
const wss = new WebSocketServer({ port: websocketConfig.port }, () => {
  console.log(
    `WebSocket server started on ws://localhost:${websocketConfig.port}`,
  );
});

//let { server, wss } = getDelayedWss();
//
//// Start your WebSocket server (assuming this function is defined elsewhere)
startWebSocketServer(wss);
//
//const PORT = 8000;
//server.listen(PORT, () => {
//  console.log(`Server is listening on port ${PORT}`);
//});

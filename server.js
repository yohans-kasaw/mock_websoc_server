import { WebSocketServer } from "ws";
import { websocketConfig } from "./config.js";
import startWebSocketServer from "./controller/websocketController.js";

// Function to parse and validate the sending interval from command-line arguments
function getSendingInterval(defaultInterval = 1000) {
  const args = process.argv.slice(2); // Skip 'node' and script name

  if (args.length > 0) {
    const value = args[0];
    const parsed = parseInt(value, 10);

    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    } else {
      console.warn(
        `Invalid interval value "${value}". Using default interval of ${defaultInterval} ms.`
      );
    }
  }

  return defaultInterval;
}

const sending_interval = getSendingInterval(1000);

const wss = new WebSocketServer({ port: websocketConfig.port }, () => {
  console.log(
    `WebSocket server started on ws://localhost:${websocketConfig.port}`
  );
  console.log(`Sending interval set to ${sending_interval} ms.`);
});

startWebSocketServer(wss, sending_interval);

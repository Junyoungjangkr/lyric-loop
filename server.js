const express = require("express");
const WebSocket = require("ws");
const app = express();

// Serve static files from public/
app.use(express.static("public"));

// Start HTTP server
const server = app.listen(3000, () => {
  console.log("HTTP server running on http://localhost:3000");
});

// Start WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    // Broadcast to all other clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log("WebSocket server running!");

# Websocket
- We did HTTP first to communicate accross the internet
- HTTP is a client to server communication, that's not what we want. We want the server to communicate to us by its initiative, not just when we ask it for something.
- So we got ***WEBSOCKET***, which runs under the HTTP protocol
- How do we do it?
```
// To server
GET /chat HTTP/2
Upgrade: websocket
Connection: Upgrade

// From server
HTTP/2 200 OK
Upgrade: websocket
Connection: Upgrade

// The server and client send ping and pong back and forth at intervals to make sure the connection is still good
```
- Here is how to set up the Websocket
```
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 9900 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = String.fromCharCode(...data);
    console.log('received: %s', msg);

    ws.send(`I heard you say "${msg}"`);
  });

  ws.send('Hello webSocket');
});

// And this is how the browser can communicate with the websocket
const socket = new WebSocket('ws://localhost:9900');

socket.onmessage = (event) => {
  console.log('received: ', event.data);
};

socket.send('I am listening');

// If we want to make the web socket secure like the HTTP, include:
const protocol = window.location.protocol === 'http
```

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

# React
- This is done with JSX, putting HTML and JS together. It's really a flavor of JS.
- This allows you to separate things by functionality and not file type
- The browser can't read JSX, so we use Babel to convert it into JS for the browser to read
```
// Example conversion

//JSX
const i = 3;
const list = (
  <ol class='big'>
    <li>Item {i}</li>
    <li>Item {3+i}</li>
  </ol>
);

// JS
const i = 3;
const list = React.createElement(
  'ol',
  { class: 'big' },
  React.createElement('li', null, 'Item ', i),
  React.createElement('li', null, 'Item ', 3 + i)
);

```

## Components
- We want to separate things into components that we build the page out of. 
- Since we have the HTML and JS together, we can write them for one component and thus modularize things in our page
- You can define new elements and then make a function to create the element
``` 
ReactDOM.render(<Hello name="lee"></Hello>)
const Hello = ({name}) => {

```

## States
- You have states of the component that you can change as well
```
const Hello = () => {
  const [attribute, setAttribute] = React.useState('attributeValue');
  --> This defines the attribute's value, the attribute name is specified 
  
  function changeColor() {
    setColor(color === "red" ? "green" : "red");
  }
  --> This updates the color
  
  obj = new Object{color: color};
  --> This uses the color as you defined it 
```

## How to set it up in our server

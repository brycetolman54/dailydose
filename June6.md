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
const Hello = ({ phrase }) => {
  return (
    <div>
      <p>Hello {phrase}</p>
    </div>
  );
};

ReactDOM.render(<Hello phrase="function" />,
                   document.querySelector("#root"));
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
- We don't want a multi-page application
- We want a single page that we change based on what the user does
- We just inject different components into that one HTML page

### React Router
- The Browser Router is the top level. It wraps the whole application
- The NavLink is a router that triggers the component change
- The Routes section defines the mapping between the path from the NavLink to the actualy component to render

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='app'>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/users'>Users</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/about' element={<About />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
```

### Toolchains
- Runs tools in a sequence to get from one thing to another
- `npm run build` calls `vite build` which makes the JSX to JS, then minimizes it for you and puts it in your files
- `npm run dev` calls vite again so that you can automatically update the browser you are working on, like LiveServer
```
npm create vite@latest demoVite -- --template react
--> The create is like install and run
--> Will get latest version of vite
--> Will put in template files for using vite and react
cd demovite
npm install
npm run dev
```
- This will create a nice example for you, the package.json has a lot of things, and it tells you the scripts that you can use with vite for production
- You need one html file, an `index.html` that will call your `main.jsx` that calls all other `.jsx` files that you will use in your application
- We want our backend service in a `service` directory, the `index.html` in our root directory, and the other `.jsx` files in a `source` directory
- You have to get the deployReact script now to update your server stuff
- When you are trying to call endpoints from your server and using vite, you just redirect that request from vite to the server with the `vite.config.js` file

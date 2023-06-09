// Get the Websocket from the modules
const {WebSocketServer} = require('ws');
// We are going to need unique ids later
const uuid = require('uuid');

// This is the function that will deal with all that our websocket does
// It will take the server that we host all on and upgrade it
function chatFunction(httpServer) {
     
    // First we need to create a WebSocket object
    // We include noserver because we want it to work on the same http server that everything else is hosted on
    const wss = new WebSocketServer({noserver: true});

    // Now we upgrade the server we already have
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    // Store all the connections of people with the server
    let connections = [];

    // This is what we can do when we are connected
    wss.on('connection', (ws) => {
        // Create the connection for this user with the server
        const connection = {id: localStorage.getItem('username'), alive: true, ws: ws};
        // Push that connection into our array
        connections.push(connection);

/*
- Send the message with your name and the name of the person you are sending it to to the server
- When the server gets the message, check the name and send it to the right person only
- When you receive the message, check to see if the sender is the same as the open chat
- If it is, just put the message on the screen
- if it isn't higlight the user's chat in the side menu (add something to remove this when a chat is opened)
- We need to add something to hold this color when a chat hasn't been opened that has been sent to
- When you log on, send a notification to all that changes your dot to green
- When you log off, send a notification to all that changes your dot back
- You have to deal with receiving messages, logon notices, and log off notices
- Include a bit at the beginning of each message that will tell if it is a notice or a messagecc n
*/

        // We want to send a message to a specific person
        // When we send it, we just want to reload their page and open the chat with the user that sent the message
        ws.on('message', function message(data) => {
            const c = 
        });

        // We need to remove the user from the connections array when they close the connection
        // o is what we are looking for, i is the index of that
        ws.on('close', () => {
            connections.findIndex((o, i) => {
                if(o.id = connections.id) {
                    connections.splice(i, 1);
                    // This return makes the function stop 
                    return true;
                }
            });
        });

        // This will keep the connections alive when they receive a pong
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    // Make sure the connections are still good every 10 seconds
    setInterval(() => {
        connections.forEach((c) => {
            // Kill it if it is not active
            if(!c.alive) {
                c.ws.terminate();
            }
            // If it is active, set it as not active and send it a ping, it wil become active if a pong is received as above
            else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}   

module.exports = {chatFunction};
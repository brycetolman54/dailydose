const express = require('express');
const app = express();

// The service port. In production the fronted code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints, this just makes it so we don't have to put in 'api' for every path
var apiRouter = express.Router();
app.use('/api', apiRouter);

// We need to put a new user in the array
apiRouter.post('/login/user', (req, res) => {
    // Pull out the info from the put
    const user = req.body.user;
    const data = req.body.data;
    // If the user is not already here, add them
    if(!users.includes(user)) {
        users.push(user);
        userData.push(data);
    }
});

// What if we need to get the posts
apiRouter.get('/feed/posts', (req, res) => {
    res.send(posts);
});

// What if we need to add a new post
apiRouter.post('/feed/post', (req, res) => {
    const post = req.body;
    posts.push(post);
});

// What if we need to get the likes of the person that we are starting the page for
apiRouter.get('/feed/:user', (req, res) => {
    const rootUser = userData.find(obj => obj.name === user);
    res.send(rootUser.likes);
});

// What if we need to like a post
apiRouter.put('/feed/:user/like/:post', (req, res) => {

});

// what if we dislike a post
apiRouter.put('/feed/:user/dislike/:post', (req, res) =>{

});

// Now if we need to get the users
apiRouter.get('/chat/users', (req, res) => {
    res.send(users);    
});

// What if we want to get the chats of the root user
apiRouter.get('/chat/:user', (req, res) => {
    const rootUser = userData.find(obj => obj.name === user);
    res.send(rootUser.chats);
});

// What if we want to get the chat of the partner
apiRouter.get('/chat/:user/with/:user2', (req, res) => {
    // Get the userData for the person we are chatting with
    const toUser = userData.find(obj => obj.name === user2);
    // Get the chats with the rootUser from that guy's data
    const rootUserChat = toUser.chats.find(obj => obj.name === user);
    // Send that back
    res.send(rootUserChat);
});

// We want to set right the storage data of the rootUser once it has been updated
apiRouter.put('/chat/:user/update/msg', (req, res) => {
    const data = req.body;
    userData[data.num] = data;
});

// We want to do the same for the user with whom we are chatting
apiRouter.put('/chat/:user/replace/messages', (req, res) => {
    // Get the new chat sent to us from the server
    const userChat = req.body;
    // Get the user whose chats we are updating
    const theUser = userData.find(obj => obj.name === user);
    // Get that user's chats
    const allChats = theUser.chats;
    // Replace the appropriate chat
    allChats[userChat.num] = userChat;
    // Replace the chats for the user
    theUser.chats = allChats;
    // Replace the user in userData
    userData[theUser.num] = theUser;
});

// Now we need to pull the posts of the root user for the posts page to display them

// Also we need to get the likes of our rootuser for the liked posts table

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//Initialize the data arrays
let posts = [];
let users = [];
let userData = [];

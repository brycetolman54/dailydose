// Start using express
const express = require('express');
// Get the app to use for later
const app = express();
// Get the DB info to use its functions and retrieve data and such
const DB = require('./database.js');

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
apiRouter.post('/login/user', async (req, res) => {

    // If the user isn't in the array, add him
    const array = await DB.getUser(req.body.user);
    if( array.length === 0) {
        await DB.addUser(req.body);
    }
    res.send('done');

});

// What if we need to get the posts
apiRouter.get('/*/posts', async (_req, res) => {

    const posts = await DB.getPosts();
    res.send(posts);

});

// What if we need to add a new post
apiRouter.post('/feed/post/:user', async (req, res) => {

    // Add the post to all the posts
    await DB.addPost(req.body);

    res.send('good');

});

// What if we need to get the likes of the person that we are starting the page for
apiRouter.get('/feed/:user', async (req, res) => {
    const likes = await DB.getLikes(req.params.user);
    res.send(likes);
});

// What if we need to like a post
apiRouter.post('/feed/:user/like/:post', async (req, res) => {
    
    await DB.like(req.params.post, req.params.user);
    
    res.send('good');
});

// what if we dislike a post
apiRouter.post('/feed/:user/dislike/:post', async (req, res) =>{
    
    await DB.unlike(req.params.post, req.params.user);

    res.send('good');
});

// Now if we need to get the users
apiRouter.get('/chat/users', (req, res) => {
    res.send(users);    
});

// What if we want to get the chats of the root user
apiRouter.get('/chat/:user', (req, res) => {
    const rootUser = userData.find(obj => obj.name === req.params.user);
    res.send(rootUser.chats);
});

// What if we want to get the chat of the partner
// apiRouter.get('/chat/:user/with/:user2', (req, res) => {
//     // Get the userData for the person we are chatting with
//     const toUser = userData.find(obj => obj.name === req.params.user2);
//     // Get the chats with the rootUser from that guy's data
//     const rootUserChat = toUser.chats.find(obj => obj.name === req.params.user);
//     // Send that back
//     res.send(rootUserChat);
// });

// We want to update the chats of the root user
apiRouter.post('/chat/:user/update/chats', (req, res) => {
    // Get the data of the user
    const theUser = userData.find(obj => obj.name === req.params.user);
    // Set his chats equal to the req body
    theUser.chats = req.body;
    // Now we can reset the userData with the new user's data
    userData[theUser.num] = theUser;
    res.send('done');
});

// We want to update the chats of the user with who we are chatting
apiRouter.post('/chat/new/with/:user', (req, res) => {
    // Get the user
    const theUser = userData.find(obj => obj.name === req.params.user);
    // Set his chats equal to the new chats with req body after adding the num attribute
    const chat = req.body;
    chat.num = theUser.chats.length;
    theUser.chats.push(chat);
    // Update the userData array
    userData[theUser.num] = theUser;
    res.send('done');
});

// We want to set right the storage data of the rootUser once it has been updated
// apiRouter.put('/chat/:user/update/msg', (req, res) => {
//     const data = req.body;
//     userData[data.num] = data;
// });

// We want to do the same for the user with whom we are chatting
apiRouter.post('/chat/:user/update/messages/with/:user2', (req, res) => {
    // Get the user whose messages we are updating
    const theUser = userData.find(obj => obj.name === req.params.user);
    // Find the right chats with the second user
    const theChat = theUser.chats.find(obj => obj.name === req.params.user2);
    // Now get the info from the req body
    const time = req.body.time;
    const msg = req.body.msg;
    // Now update the time of the chat for the user's chat
    theChat.time = time;
    // Now push the message onto the messages array of the chat
    theChat.messages.push(msg);
    // Put the chat back
    theUser.chats[theChat.num] = theChat;
    // Put the user back
    userData[theUser.num] = theUser;
    
    res.send('done');
});

// Now we need to pull the posts of the root user for the posts page to display them
apiRouter.get('/posts/mine/:user', (req, res) => {
    // Get the user
    const theUser = userData.find(obj => obj.name === req.params.user);
    res.send(theUser.posts);
});
// Also we need to get the likes of our rootuser for the liked posts table
apiRouter.get('/posts/liked/:user', (req, res) => {
    // Get the user
    const theUser = userData.find(obj => obj.name === req.params.user);
    res.send(theUser.likes);
}); 
// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

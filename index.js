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
apiRouter.get('/chat/users', async (_req, res) => {
    
    const users = await DB.getUsers();
    res.send(users);    
});

// What if we want to get the chats of the root user
apiRouter.get('/chat/:user', async (req, res) => {
    const chats = await DB.getUserChats(req.params.user);
    res.send(chats);
});

// We want to update the chats of the root user
apiRouter.post('/chat/:user/update/chats', async (req, res) => {
    
    await DB.updateChats(req.params.user, req.body);

    res.send('done');

});

// We want to update the chats of the user with who we are chatting
apiRouter.post('/chat/new/with/:user', async (req, res) => {

    await DB.updateHisChats(req.params.user, req.body);

    res.send('done');

});

// // We want to set right the storage data of the rootUser once it has been updated
// apiRouter.put('/chat/:user/update/msg', (req, res) => {
//     const data = req.body;
//     userData[data.num] = data;
// });

// We want to do the same for the user with whom we are chatting
apiRouter.post('/chat/:user/update/messages/with/:user2', async (req, res) => {
    
    await DB.updateHisMessages(req.params.user, req.params.user2, req.body);
    
    res.send('done');
});

// Now we need to pull the posts of the root user for the posts page to display them
apiRouter.get('/posts/mine/:user', async (req, res) => {
    const mine = await DB.getUserPosts(req.params.user);
    res.send(mine);
});
// Also we need to get the likes of our rootuser for the liked posts table
apiRouter.get('/posts/liked/:user', async (req, res) => {
    const liked = await DB.getLiked(req.params.user);
    res.send(liked);
}); 


// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

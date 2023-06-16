// Start using express
const express = require('express');
// Get the app to use for later
const app = express();
// Get the DB info to use its functions and retrieve data and such
const DB = require('./database.js');
// Get the encrypting guy
const bcrypt = require('bcrypt');
// Get the cookie parser
const cookieParser = require('cookie-parser');
// Pull in the WebSockets server
const {chatFunction} = require('./chatFunction.js');

// The service port. In production the fronted code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// This makes us use the cookie parser middleware for tracking authentication
app.use(cookieParser());

// This lets us trust headers forwarded from the proxy so we can determine the IP addresses
app.set('trust proxy', true);

// This sets the cookie name
const authCookieName = 'token';

// Router for service endpoints, this just makes it so we don't have to put in 'api' for every path
var apiRouter = express.Router();
app.use('/api', apiRouter);

// This function actually sets the cookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
};

// This guy creates a token for a new user
apiRouter.post(`/auth/signup`, async (req, res) => {
    if(await DB.getUser(req.body.user)) {
        res.status(409).send({msg: 'This user already exists'});
    }
    else {
        const user = await DB.addUser(req.body.user, req.body.password, req.body.data);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({id: user._id});
    }
});

// This gets the authToken for a user's provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.user);
    if(user) {
        if(await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({id: user._id});
            return;
        }
    }
    res.status(401).send({msg: 'Username and/or password is incorrect' });
});

// Delete the authToken if it is stored in a cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
}); 

// Gets the user's info
apiRouter.get('/auth/:user', async (req, res) => {
    const user = await DB.getUser(req.params.user);
    if(user) {
        const token = req?.cookies.token;
        res.send({user: user.user, authenticated: token === user.token});
        return;
    }
    res.status(401).send({msg: 'This user is unknown'});
});

// Now we need to pull the posts of the root user for the posts page to display them
apiRouter.get('/posts/mine/:user', async (req, res) => {
    const mine = await DB.getUserPosts(req.params.user);
    res.send(mine);
});

// What if we need to get the posts
apiRouter.get('/*/posts', async (_req, res) => {

    const posts = await DB.getPosts();
    res.send(posts);

});

// Also we need to get the likes of our rootuser for the liked posts table
apiRouter.get('/posts/liked/:user', async (req, res) => {
    const liked = await DB.getLiked(req.params.user);
    res.send(liked);
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

// Make a secure router for the one above to use to verify credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);
secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if(user) {
        next();
    }
    else {
        res.status(401).send({msg: 'He does not exist'});
    }
});


// What if we need to add a new post
secureApiRouter.post('/feed/post/:user', async (req, res) => {

    // Add the post to all the posts
    await DB.addPost(req.body);

    res.send('good');

});



// Now if we need to get the users
secureApiRouter.get('/chat/users', async (_req, res) => {
    
    const users = await DB.getUsers();
    res.send(users);    
});

// What if we want to get the chats of the root user
secureApiRouter.get('/chat/:user', async (req, res) => {
    const chats = await DB.getUserChats(req.params.user);
    res.send(chats);
});

// We want to update the chats of the root user
secureApiRouter.post('/chat/:user/update/chats', async (req, res) => {
    
    await DB.updateChats(req.params.user, req.body);

    res.send('done');

});

// We want to update the chats of the user with whom we are chatting
secureApiRouter.post('/chat/new/with/:user', async (req, res) => {

    await DB.updateHisChats(req.params.user, req.body);

    res.send('done');

});

// We want to do the same for the user with whom we are chatting
secureApiRouter.post('/chat/:user/update/messages/with/:user2', async (req, res) => {
    
    await DB.updateHisMessages(req.params.user, req.params.user2, req.body);
    
    res.send('done');
});





// Be able to update the unseen value of a post
secureApiRouter.post('/chat/:user1/with/:user2/unseen/:bool', async (req, res) => {
    if(req.params.bool === 'true') {
        await DB.updateUnseen(req.params.user1, true, req.params.user2);
    }
    else if(req.params.bool === 'false') {
        await DB.updateUnseen(req.params.user1, false, req.params.user2);
    }

    res.send('done');

});

// Default error message
app.use(function (err, req, res, next) {
    res.status(500).send({type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

const httpServer = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

chatFunction(httpServer);

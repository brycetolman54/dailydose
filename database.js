// Get the mongo client from the module
const { MongoClient } = require('mongodb');

// Get the info from your login file for the DB
const config = require('./dbConfig.json');

// Make the url to enter the DB
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// Start the client 
const client = new MongoClient(url);

// Get the startup db from the client
const db = client.db('DailyDose');

// Get the different collections from the DB
const posts = db.collection('posts');
const userData = db.collection('userData');
const users = db.collection('users');

// Get the bcrypt and uuid to hash passwords and provide tokens
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// Asynchronously test the connection
(async function testConnection() {
    await client.connect();
    await db.command({ping: 1});
})().catch((ex) => {
    console.log(`Unable to connect to the database with ${config.hostname} because ${ex.message}`);
    process.exit(1);
});

/**********************************************************************************************************************************/

// Add a user
async function addUser(body) {
    // Put the result in the arrays
    const user = await users.insertOne({user: body.user});
    const result = userData.find()
    const array = await result.toArray()
    const long = array.length;
    body.data.num = long;
    const data = await userData.insertOne(body.data);   
    return {user, data};
};
// See if we have a user there already
async function getUser(userId) {
    // See if you can find him in the array
    const result = users.find({user: `${userId}`});
    const array = await result.toArray();
    return array;
};
// Gets the user data
async function getUserData(userId) {
    const result = userData.find({name: `${userId}`});
    const theUser = await result.toArray();
    return theUser[0];
};
// This is to get all posts
async function getPosts() {
    const postList = posts.find();
    const postsArray = await postList.toArray();
    const orderPosts = postsArray.sort((a,b) => {
        if(a.time > b.time) {
            return -1;
        }
        else if (a.time < b.time) {
        }
        else {
            return 0;
        }
    });
    return orderPosts;
};
// This is to add a post
async function addPost(post) {

    // Get all posts
    const allPosts = await getPosts();

    // Give the post a place 
    const long = allPosts.length;
    post.place = long;

    // Add the post to the posts of the user
    const theUser = await getUserData(post.user);
    userObj = new Object();
    userObj.myPlace = theUser.posts.length;
    userObj.allPlace = long;
    userData.updateOne(
        {name: theUser.name},
        {$push: {posts: userObj}},
    );

    // Insert the post into the array
   await posts.insertOne(post);

};
// Get the likes array so you can populate the feed and the tables
async function getLikes(user) {
    
    // Get the user
    const theUser = await getUserData(user);

    // Now get his likes and return them
    const likes  = theUser.likes;
    return likes;

};
// Like Posts
async function like(post, user) {
    // Increase the post's like count (after getting all posts)
    const allPosts = await getPosts();
    await posts.updateOne(
        {place: allPosts[post].place},
        {$inc: {likes: 1}}
    )

    // Now get the user and update his likes array
    await userData.updateOne(
        {name: user},
        {$push: {likes: allPosts[post].place}}
    );
};
// Unlike posts
async function unlike(post, user) {
    // Decrease the post's like count (after getting all posts)
    const allPosts = await getPosts();
    posts.updateOne(
        {place: allPosts[post].place},
        {$inc: {likes: -1}}
    )

    // Now get the user and update his likes array
    userData.updateOne(
        {name: user},
        {$pull: {likes: allPosts[post].place}}
    );
};
// To get the users for the chat
async function getUsers() {
    const response = users.find();
    const allUsers = await response.toArray();
    return allUsers;
};
// Get the user's chat
async function getUserChats(user) {
    const theUser = await getUserData(user);
    const chats = theUser.chats;
    const orderChats = chats.sort((a,b) => a.num - b.num);
    return chats;
};
// Update the chat list of the main user
async function updateChats(user, chat) {
    userData.updateOne(
        {name: user},
        {$set: {chats: chat}}
    );
};
// Update the list of the user we are talking to
async function updateHisChats(user, chat) {
    // Get the user's chats
    const chats = getUserChats(user);
    chat.num = chats.length;
    userData.updateOne(
        {name: user},
        {$push: {chats: chat}}
    );
};
// Update the message of the person we are talking with
async function updateHisMessages(user, user2, body) { 
    // Get the chats of the person we are updating
    const allChats = await getUserChats(user);
    // Get the right chat
    const theChat = allChats.find(obj => obj.name === user2);
    // Get the info from the body
    theChat.time = body.time;
    theChat.messages.push(body.msg);
    // Put it all back
    allChats[theChat.num] = theChat;
    userData.updateOne(
        {name: user},
        {$set: {chats: allChats}}
    );
};
// Get user posts
async function getUserPosts(user) {
    const theUser = await getUserData(user);
    const mine = theUser.posts;
    return mine;
};
// Get the posts the user has liked
async function getLiked(user) {
    const theUser = await getUserData(user);
    const liked = theUser.likes;
    return liked;
};

/******************************************************************************************************************************************************/

// Export the functions so you can use them in your index.js file
module.exports = { 
    addUser, 
    getUser, 
    getPosts, 
    addPost, 
    getUserData, 
    getLikes, 
    like, 
    unlike, 
    getUsers, 
    getUserPosts, 
    getLiked, 
    getUserChats, 
    updateChats, 
    updateHisChats, 
    updateHisMessages 
};

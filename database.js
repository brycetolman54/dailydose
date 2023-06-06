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

// Asynchronously test the connection
(async function testConnection() {
    await client.connect();
    await db.command({ping: 1});
})().catch((ex) => {
    console.log(`Unable to connect to the database with ${config.hostname} because ${ex.message}`);
    process.exit(1);
});

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
// This is to get all posts
function getPosts() {
    const postList = posts.find();
    return postList.toArray();
};
// This is to add a post
function addPost(post) {

};


// Export the functions so you can use them in your index.js file
module.exports = { addUser, getUser, getPosts, addPost };

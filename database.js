// Get the mongo client from the module
const { MongoClient } = require('mongodb');

// Get the info from your login file for the DB
const config = require('./dbconfig.json');

// Make the url to enter the DB
const url = `mongodb+srv://${donfig.userName}:${config.password}@${config.hostname}`;

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
})().catch((err) => {
    console.log(`Unable to connect to the database with ${dbconfig.hostname} because ${ex.message}`);
    process.exit(1);
});


// Export the functions so you can use them in your index.js file
module.exports = {};

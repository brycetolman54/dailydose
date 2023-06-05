const { MongoClient } = require('mongodb');

const config = require('./dbconfig.json');

const url = `mongodb+srv://${donfig.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);

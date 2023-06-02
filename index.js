const express = require('express');
const app = express();

// The service port. In production the fronted code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints, this just makes it so we don't have to put in 'api' for every path
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Add in your stuff

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

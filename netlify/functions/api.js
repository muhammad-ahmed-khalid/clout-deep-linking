const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const app = express();
const router = Router();

// Serve the `apple-app-site-association.json` file
app.use('/.well-known/apple-app-site-association', (req, res) => {
    const filePath = path.join(__dirname, '/.well-known/apple-app-site-association.json');
    if (fs.existsSync(filePath)) {
        const fileStats = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': fileStats.size
        });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    } else {
        res.status(404).send('File not found');
    }
});

// Serve the `assetlinks.json` file
app.use(['/assetlinks.json', '/.well-known/assetlinks.json'], (req, res) => {
    const filePath = path.join(__dirname, '/.well-known/assetlinks.json');
    if (fs.existsSync(filePath)) {
        const fileStats = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': fileStats.size
        });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    } else {
        res.status(404).send('File not found');
    }
});

// Middleware to serve static files
app.use(express.static(__dirname)); // Serves resources from the current directory

// Serve `index.html` for any unmatched routes
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Additional API route
router.get('/hello', (req, res) => res.send('Hello World!'));
app.use('/api/', router);

// Start the server locally
const port = process.env.PORT || 8080;
console.log(port, "This is port");
app.listen(port, () => {
    console.log('App started');
});

// Export the serverless handler
const api = express();
api.use('/api/', router);
module.exports.handler = serverless(api);

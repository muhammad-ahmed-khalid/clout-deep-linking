const { log } = require('console');
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

app.use('/apple-app-site-association', (req, res) => {
    const filePath = path.join(__dirname, '/.well-known/apple-app-site-association.json');
    const fileStats = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': fileStats.size
    })
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})

app.use('/.well-known/assetlinks.json', (req, res) => {
    const filePath = path.join(__dirname, '/.well-known/assetlinks.json');
    const fileStats = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': fileStats.sizep
    })
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})

app.use('/assetlinks.json', (req, res) => {
    const filePath = path.join(__dirname, '/.well-known/assetlinks.json');
    const fileStats = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': fileStats.size
    })
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})

app.use('/.well-known/apple-app-site-association', (req, res) => {
    const filePath = path.join(__dirname, '/.well-known/apple-app-site-association.json');
    const fileStats = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': fileStats.size
    })
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})

//setting middleware
app.use(express.static(__dirname)); //Serves resources from public folder

app.use('*', (req, res) => {
    return res.sendFile(__dirname + '/index.html')
})

const port = process.env.PORT || 8080
console.log(port,"This is port")
var server = app.listen(port, () => {
    console.log('app started')
});

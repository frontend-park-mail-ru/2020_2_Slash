'use restrict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.flicksbox.ru/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.flicksbox.ru/fullchain.pem');

const server = express();
const port = process.env.PORT || 3000;

const staticPath = path.resolve(__dirname, '../dist');

server.use('/static/', express.static(staticPath));
server.use(express.static(staticPath));

server.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

https.createServer({
    key: privateKey,
    cert: certificate,
}, server).listen(443);

http.createServer((req, res) => {
    res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
}).listen(port);


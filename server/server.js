'use restrict';

const express = require('express');
const path = require('path');

const server = express();
const port = process.env.PORT || 3000;

const staticPath = path.resolve(__dirname, '../public');
const tempStaticPath = path.resolve(__dirname, '../src');

server.use('/static/', express.static(staticPath));
server.use('/', express.static(tempStaticPath));

server.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

server.listen(port, () => {
    console.log(`Started at port:${port}`);
});

'use restrict';

const express = require('express');
const path = require('path');

const server = express();
const port = 3000;

const staticPath = path.resolve(__dirname, '../public');

server.use(express.static(staticPath));

server.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

server.listen(port, () => {
    console.log(`Started at port:${port}`);
});

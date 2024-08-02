const express = require('express');
const server = express();

server.get('/', (req,res) => {
    res.send({message: 'Working'});
});

module.exports = server;
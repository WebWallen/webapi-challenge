const express = require('express');
const helmet = require('helmet');

// Put routers here

const server = express();
server.use(express.json());
server.use(helmet());

// Put routes here

server.listen(4000, () => console.log('API running on port 4000'))
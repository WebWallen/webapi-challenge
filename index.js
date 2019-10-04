const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Put routers here
const projectRoutes = require('./routes/projectRoutes');
const actionRoutes = require('./routes/actionRoutes');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// Put routes here
// server.use('/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

server.get('/', (req, res) => {
    res.send(`<h1>Testing 1 2 3 </h1>`)
})

server.listen(4000, () => console.log('API running on port 4000'))
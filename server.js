const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./api/auth/auth-router.js');
const usersRouter = require('./api/users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/', authRouter);
server.use('/api/users', usersRouter);

// Base Route
server.get('/', (req, res) => {
  res.send("<div align=\'center\'>" + 
    "<p>Hello World!</p>" + 
    "<p>This is the Starting Page.</p>" +
    "</div>");
});

module.exports = server;

const express = require("express");
const config = require("../config/app.config")
const logger = require("./logger-init")
const path = require("path")

const server = express();

// Set port
server.listen(config.app.port, () => {
    logger.info(`Server listening on ${config.app.port}`);
});

server.use(express.static(path.join(__dirname, "../..", "build")));
// Set logging middleware
const reqLogger = (req, res, next) => {
    logger.info(`New request received, path:${req.originalUrl}`);
    next();
}

server.use(reqLogger);
server.use(express.json());

// Set routes
server.use('/api/recipe', require('../controllers/recipe-controller'));


// server.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "../..", "build", "index.html"));
// });

const mongoose = require('mongoose');
mongoose.connect(config.db.url)
    .then((result) => logger.info(`Connected to DB`))
    .catch((err) => logger.error(`Failed to connect to DB`));

module.exports = server;

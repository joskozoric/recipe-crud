const log4js = require("log4js");

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: {type: "file", filename: "logs/app.log"}
    },
    categories: {
        default: {
            appenders: ["app", "out"],
            level: 'trace'
        }
    }
});

const logger = log4js.getLogger();

module.exports = logger;
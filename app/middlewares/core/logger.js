const logger = require("morgan");
const loggerMiddleware = logger("dev");
module.exports = loggerMiddleware;

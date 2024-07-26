const createError = require("http-errors");

function notFoundHandlerMiddleware(req, res, next) {
  next(createError(404));
}

function errorHandlerMiddleware(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("error");
}

module.exports = {
  notFoundHandlerMiddleware,
  errorHandlerMiddleware,
};

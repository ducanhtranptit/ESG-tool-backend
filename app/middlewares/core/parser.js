const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const jsonParserMiddleware = express.json();
const urlEncodedParserMiddleware = express.urlencoded({ extended: false });
const cookieParserMiddleware = cookieParser();

module.exports = {
  jsonParserMiddleware,
  urlEncodedParserMiddleware,
  cookieParserMiddleware,
};

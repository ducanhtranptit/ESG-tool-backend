import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export const jsonParserMiddleware = express.json();
export const urlEncodedParserMiddleware = express.urlencoded({ extended: false });
export const cookieParserMiddleware = cookieParser();

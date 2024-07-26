import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import loggerMiddleware from "./middlewares/core/logger.js";
import { jsonParserMiddleware, urlEncodedParserMiddleware, cookieParserMiddleware } from "./middlewares/core/parser.js";
import router from "./apis/index.js";
import { notFoundHandlerMiddleware, errorHandlerMiddleware } from "./middlewares/core/handler.js";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());

app.use(loggerMiddleware);
app.use(jsonParserMiddleware);
app.use(urlEncodedParserMiddleware);
app.use(cookieParserMiddleware);

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(router);
app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

export default app;

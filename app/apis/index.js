import express from "express";
import UploadApi from "./upload.api.js";
import config from "../../config/config.js";

const router = express.Router();
const baseUrl = config.baseUrl;

router.use(`${baseUrl}/upload`, UploadApi);

export default router;

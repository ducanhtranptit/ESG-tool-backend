import express from "express";
import UploadApi from "./upload.api.js";
import ESGReportApi from "./esg-report.js";
import AuthApi from "./auth.api.js";
import config from "../../config/config.js";

const router = express.Router();
const baseUrl = config.baseUrl;

router.use(`${baseUrl}/upload`, UploadApi);
router.use(`${baseUrl}/esg`, ESGReportApi);
router.use(`${baseUrl}/auth`, AuthApi);

export default router;

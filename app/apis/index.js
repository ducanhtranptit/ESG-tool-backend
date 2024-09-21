import express from "express";
import UploadApi from "./upload.api.js";
import ESGReportApi from "./esg-report.js";
import AuthApi from "./auth.api.js";
import QuestionApi from "./question.api.js";
import EnvironmentApi from "./environment.js";
import UserApi from "./user.js";
import DashboardApi from "./dashboard.js";
import CompanyInforApi from "./companyinfor.js";
import config from "../../config/config.js";

const router = express.Router();
const baseUrl = config.baseUrl;

router.use(`${baseUrl}/upload`, UploadApi);
router.use(`${baseUrl}/esg`, ESGReportApi);
router.use(`${baseUrl}/auth`, AuthApi);
router.use(`${baseUrl}/questions`, QuestionApi);
router.use(`${baseUrl}/environment`, EnvironmentApi);
router.use(`${baseUrl}/users`, UserApi);
router.use(`${baseUrl}/dashboard`, DashboardApi);
router.use(`${baseUrl}/user`, CompanyInforApi);

export default router;

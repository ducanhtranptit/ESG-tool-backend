import express from "express";
import ReportController from "../../controllers/report.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import  verifyApiKey  from "../../middlewares/auth/verify-apikey.middleware.js";
const router = express.Router();

router.get(
	"/webapp/report/get-all-data",
	verifyTokenMiddleware,
	ReportController.getAllDataForReport
);

router.get(
	"/webapp/report/download-report-template",
	verifyApiKey,
	ReportController.downloadReportTemplate
);

export default router;

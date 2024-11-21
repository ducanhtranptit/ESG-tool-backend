import express from "express";
import ReportController from "../../controllers/report.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/webapp/report/get-all-data",
	verifyTokenMiddleware,
	ReportController.getAllDataForReport
);

export default router;

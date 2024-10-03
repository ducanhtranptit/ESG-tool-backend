import express from "express";
import SocialController from "../controllers/social.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/chart-sex-ratio",
	verifyTokenMiddleware,
	SocialController.dataSexRatioChart
);
router.get(
	"/chart-training",
	verifyTokenMiddleware,
	SocialController.dataTrainingChart
);
router.get(
	"/chart-salary-change",
	verifyTokenMiddleware,
	SocialController.dataSalaryChangeChart
);
router.get(
	"/chart-risk",
	verifyTokenMiddleware,
	SocialController.dataRiskChart
);
router.get(
	"/chart-expenditure",
	verifyTokenMiddleware,
	SocialController.dataExpenditureChart
);

export default router;

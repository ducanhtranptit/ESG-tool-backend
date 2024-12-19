import express from "express";
import SocialController from "../../controllers/social.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/webapp/social/chart-sex-ratio",
	verifyTokenMiddleware,
	SocialController.dataSexRatioChart
);
router.get(
	"/webapp/social/chart-training",
	verifyTokenMiddleware,
	SocialController.dataTrainingChart
);
router.get(
	"/webapp/social/chart-salary-change",
	verifyTokenMiddleware,
	SocialController.dataSalaryChangeChart
);
router.get(
	"/webapp/social/chart-risk",
	verifyTokenMiddleware,
	SocialController.dataRiskChart
);
router.get(
	"/webapp/social/chart-expenditure",
	verifyTokenMiddleware,
	SocialController.dataExpenditureChart
);

export default router;

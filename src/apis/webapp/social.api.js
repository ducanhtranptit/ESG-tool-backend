import express from "express";
import SocialController from "../../controllers/social.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import restrictTypeMiddleware from "../../middlewares/auth/restrict-type.middleware.js";
const router = express.Router();

router.get(
	"/webapp/social/chart-sex-ratio",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	SocialController.dataSexRatioChart
);
router.get(
	"/webapp/social/chart-training",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	SocialController.dataTrainingChart
);
router.get(
	"/webapp/social/chart-salary-change",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	SocialController.dataSalaryChangeChart
);
router.get(
	"/webapp/social/chart-risk",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	SocialController.dataRiskChart
);
router.get(
	"/webapp/social/chart-expenditure",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	SocialController.dataExpenditureChart
);

export default router;

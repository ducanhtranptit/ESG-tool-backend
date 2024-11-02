import express from "express";
import EnvironmentController from "../../controllers/environment.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/webapp/environment/chart-emission",
	verifyTokenMiddleware,
	EnvironmentController.dataEmissionChart
);
router.get(
	"/webapp/environment/chart-water",
	verifyTokenMiddleware,
	EnvironmentController.dataWaterChart
);
router.get(
	"/webapp/environment/chart-waste",
	verifyTokenMiddleware,
	EnvironmentController.dataWasteChart
);
router.get(
	"/webapp/environment/chart-electricity",
	verifyTokenMiddleware,
	EnvironmentController.dataElectricityChart
);
router.get(
	"/webapp/environment/chart-ink-papers",
	verifyTokenMiddleware,
	EnvironmentController.dataInkPapersChart
);

export default router;

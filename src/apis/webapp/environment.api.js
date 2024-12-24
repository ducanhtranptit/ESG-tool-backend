import express from "express";
import EnvironmentController from "../../controllers/environment.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import restrictTypeMiddleware from "../../middlewares/auth/restrict-type.middleware.js";
const router = express.Router();

router.get(
	"/webapp/environment/chart-emission",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	EnvironmentController.dataEmissionChart
);
router.get(
	"/webapp/environment/chart-water",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	EnvironmentController.dataWaterChart
);
router.get(
	"/webapp/environment/chart-waste",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	EnvironmentController.dataWasteChart
);
router.get(
	"/webapp/environment/chart-electricity",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	EnvironmentController.dataElectricityChart
);
router.get(
	"/webapp/environment/chart-ink-papers",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	EnvironmentController.dataInkPapersChart
);

export default router;

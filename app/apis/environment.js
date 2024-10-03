import express from "express";
import EnvironmentController from "../controllers/environment.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/chart-emission",
	verifyTokenMiddleware,
	EnvironmentController.dataEmissionChart
);
router.get(
	"/chart-water",
	verifyTokenMiddleware,
	EnvironmentController.dataWaterChart
);
router.get(
	"/chart-waste",
	verifyTokenMiddleware,
	EnvironmentController.dataWasteChart
);
router.get(
	"/chart-electricity",
	verifyTokenMiddleware,
	EnvironmentController.dataElectricityChart
);
router.get(
	"/chart-ink-papers",
	verifyTokenMiddleware,
	EnvironmentController.dataInkPapersChart
);

export default router;

import express from "express";
import GovernanceController from "../controllers/governance.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/chart-sex-ratio",
	verifyTokenMiddleware,
	GovernanceController.dataSexRatioChart
);
router.get(
	"/chart-supplier-ratio",
	verifyTokenMiddleware,
	GovernanceController.dataSupplierRatioChart
);
router.get(
	"/chart-violate",
	verifyTokenMiddleware,
	GovernanceController.dataViolateChart
);

export default router;

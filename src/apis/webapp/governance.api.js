import express from "express";
import GovernanceController from "../../controllers/governance.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/webapp/governance/chart-sex-ratio",
	verifyTokenMiddleware,
	GovernanceController.dataSexRatioChart
);
router.get(
	"/webapp/governance/chart-supplier-ratio",
	verifyTokenMiddleware,
	GovernanceController.dataSupplierRatioChart
);
router.get(
	"/webapp/governance/chart-violate",
	verifyTokenMiddleware,
	GovernanceController.dataViolateChart
);

export default router;

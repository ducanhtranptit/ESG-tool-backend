import express from "express";
import GovernanceController from "../../controllers/governance.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import restrictTypeMiddleware from "../../middlewares/auth/restrict-type.middleware.js";
const router = express.Router();

router.get(
	"/webapp/governance/chart-sex-ratio",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	GovernanceController.dataSexRatioChart
);
router.get(
	"/webapp/governance/chart-supplier-ratio",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	GovernanceController.dataSupplierRatioChart
);
router.get(
	"/webapp/governance/chart-violate",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	GovernanceController.dataViolateChart
);

export default router;

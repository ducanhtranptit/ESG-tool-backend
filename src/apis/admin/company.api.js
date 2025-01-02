import express from "express";
import CompanyInforController from "../../controllers/companyinfor.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import verifyAdminMiddleware from "../../middlewares/auth/admin-verify-token.middleware.js";

const router = express.Router();

router.get(
	"/admin/companies",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	CompanyInforController.getAllCompaniesForAdmin
);

router.get(
	"/admin/conpany-metric-all",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	CompanyInforController.getAllCompanyMetricsForAdmin
);

router.get(
	"/admin/conpany-score-all",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	CompanyInforController.getAllCompanyScoreForAdmin
);

router.get(
	"/admin/industry-all",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	CompanyInforController.getAllIndustriesForAdmin
);

export default router;

import express from "express";
import UserController from "../../controllers/user.controller.js";
import CompanyInfoController from "../../controllers/companyinfor.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";

const router = express.Router();

router.get(
	"/admin/account/get-all-accounts",
	verifyTokenMiddleware,
	UserController.getAllAccount
);

router.get(
	"/admin/get-all-overall-information",
	verifyTokenMiddleware,
	CompanyInfoController.getAllOverallInfors
);

export default router;

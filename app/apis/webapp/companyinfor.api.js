import express from "express";
import CompanyInfoController from "../../controllers/companyinfor.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/webapp/user/get-all-company-infor",
	verifyTokenMiddleware,
	CompanyInfoController.getAllCompanyInfors
);
router.post(
	"/webapp/user/update-company-infor",
	CompanyInfoController.updateCompanyInfor
);

export default router;

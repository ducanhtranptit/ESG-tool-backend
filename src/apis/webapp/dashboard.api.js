import express from "express";
import DashboardController from "../../controllers/dashboard.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import restrictTypeMiddleware from "../../middlewares/auth/restrict-type.middleware.js";
const router = express.Router();

router.get(
	"/webapp/dashboard/get-all-data",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	DashboardController.getAllData
);

export default router;

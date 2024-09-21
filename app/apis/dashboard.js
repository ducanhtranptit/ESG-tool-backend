import express from "express";
import DashboardController from "../controllers/dashboard.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/get-all-data",
	verifyTokenMiddleware,
	DashboardController.getAllData
);

export default router;

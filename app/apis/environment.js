import express from "express";
import EnvironmentController from "../controllers/environment.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get("/test", verifyTokenMiddleware, EnvironmentController.testApi);

export default router;

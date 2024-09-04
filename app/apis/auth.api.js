import express from "express";
import AuthController from "../controllers/auth.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout/:userId", verifyTokenMiddleware, AuthController.logout);

export default router;

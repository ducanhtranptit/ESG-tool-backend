import express from "express";
import AuthController from "../controllers/auth.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", verifyTokenMiddleware, AuthController.logout);

export default router;

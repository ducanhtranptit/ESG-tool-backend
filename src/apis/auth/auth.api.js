import express from "express";
import AuthController from "../../controllers/auth.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";

const router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/logout", verifyTokenMiddleware, AuthController.logout);

export default router;

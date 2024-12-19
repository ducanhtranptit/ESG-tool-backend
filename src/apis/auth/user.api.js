import express from "express";
import userController from "../../controllers/user.controller.js";
import VerifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";

const router = express.Router();

router.post("/users/refresh-token", userController.refreshToken);
router.get("/users/profile", VerifyTokenMiddleware, userController.getProfile);

export default router;

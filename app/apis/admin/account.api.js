import express from "express";
import UserController from "../../controllers/user.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";

const router = express.Router();

router.get(
	"/admin/account/get-all-accounts",
	verifyTokenMiddleware,
	UserController.getAllAccount
);

export default router;

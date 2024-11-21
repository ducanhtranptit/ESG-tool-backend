import express from "express";
import QuestionController from "../../controllers/questions.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";

const router = express.Router();

router.get(
	"/admin/questions",
	verifyTokenMiddleware,
	QuestionController.getAllQuestionsForAdmin
);

export default router;

import express from "express";
import QuestionController from "../controllers/questions.controller.js";
import verifyTokenMiddleware from "../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/get-all-topics-and-questions",
	verifyTokenMiddleware,
	QuestionController.getAllTopicsAndQuestions
);
router.post(
	"/add-answer",
	verifyTokenMiddleware,
	QuestionController.addAnswerAndCalculateMetricOfCompany
);

export default router;

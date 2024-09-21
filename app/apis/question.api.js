import express from "express";
import QuestionController from "../controllers/questions.controller.js";
const router = express.Router();

router.get(
	"/get-all-topics-and-questions",
	QuestionController.getAllTopicsAndQuestions
);
router.post(
	"/add-answer",
	QuestionController.addAnswerAndCalculateMetricOfCompany
);

export default router;

import express from "express";
import QuestionController from "../../controllers/questions.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/webapp/questions/get-all-topics-and-questions/:section",
	verifyTokenMiddleware,
	QuestionController.getAllTopicsAndQuestions
);
router.post(
	"/webapp/questions/add-answer",
	verifyTokenMiddleware,
	QuestionController.addAnswerAndCalculateMetricOfCompany
);

router.get(
	"/webapp/questions/get-all-answers-of-year/",
	verifyTokenMiddleware,
	QuestionController.getAnswersOfYear
);

router.get(
	"/webapp/questions/get-all-submitcount-of-section/",
	verifyTokenMiddleware,
	QuestionController.findAllSubmitCountOfSection
);

export default router;

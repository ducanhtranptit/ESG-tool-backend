import express from "express";
import TargetController from "../../controllers/target.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
const router = express.Router();

router.get(
	"/webapp/targets/get-all-topics-and-questions",
	verifyTokenMiddleware,
	TargetController.getAllTopicsAndQuestions
);

router.get(
	"/webapp/targets/get-all-submitcount-of-section/",
	verifyTokenMiddleware,
	TargetController.findAllSubmitCountOfSection
);

router.post(
	"/webapp/targets/add-answer",
	verifyTokenMiddleware,
	TargetController.addAnswerAndCalculateMetricOfCompany
);

router.get(
	"/webapp/targets/get-all-answers-of-year/",
	verifyTokenMiddleware,
	TargetController.getAnswersOfYear
);

export default router;

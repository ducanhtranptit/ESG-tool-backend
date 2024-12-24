import express from "express";
import TargetController from "../../controllers/target.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import restrictTypeMiddleware from "../../middlewares/auth/restrict-type.middleware.js";
const router = express.Router();

router.get(
	"/webapp/targets/get-all-topics-and-questions",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	TargetController.getAllTopicsAndQuestions
);

router.get(
	"/webapp/targets/get-all-submitcount-of-section/",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	TargetController.findAllSubmitCountOfSection
);

router.post(
	"/webapp/targets/add-answer",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	TargetController.addAnswerAndCalculateMetricOfCompany
);

router.get(
	"/webapp/targets/get-all-answers-of-year/",
	verifyTokenMiddleware,
	restrictTypeMiddleware,
	TargetController.getAnswersOfYear
);

export default router;

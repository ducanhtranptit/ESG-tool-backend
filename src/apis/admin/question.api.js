import express from "express";
import QuestionController from "../../controllers/questions.controller.js";
import verifyTokenMiddleware from "../../middlewares/auth/verify-token.middleware.js";
import verifyAdminMiddleware from "../../middlewares/auth/admin-verify-token.middleware.js";

const router = express.Router();

router.get(
	"/admin/questions",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	QuestionController.getAllQuestionsForAdmin
);
router.get(
	"/admin/topics",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	QuestionController.getAllTopic
);
router.get(
	"/admin/answers",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	QuestionController.getAllAnswersForAdmin
);
router.get(
	"/admin/dummies",
	verifyTokenMiddleware,
	verifyAdminMiddleware,
	QuestionController.getAllDummiesForAdmin
);

export default router;

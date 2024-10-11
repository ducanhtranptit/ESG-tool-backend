import QuestionAction from "../actions/questions.action.js";
import { SuccessResponse, ErrorResponse, BadRequestResponse } from "../core/ApiResponse.js";

export default class QuestionController {
	static async getAllTopicsAndQuestions(req, res) {
		try {
			const data = await QuestionAction.getAllTopicsAndQuestions();
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async addAnswerAndCalculateMetricOfCompany(req, res) {
		try {
			const { id: userId } = req.data;
			if (!userId) {
				return new BadRequestResponse().send(req, res);
			}
			const { year, answers } = req.body;
			await QuestionAction.addAnswerAndCalculateMetricOfCompany(
				userId,
				year,
				answers
			);
			return new SuccessResponse().send(req, res);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

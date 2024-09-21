import QuestionAction from "../actions/questions.action.js";
import { SuccessResponse, ErrorResponse } from "../core/ApiResponse.js";

export default class QuestionController {
	static async getAllTopicsAndQuestions(req, res) {
		try {
			const data = await QuestionAction.getAllTopicsAndQuestions();
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.log(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async addAnswerAndCalculateMetricOfCompany(req, res) {
		try {
			const { companyCode, year, answers } = req.body;
			await QuestionAction.addAnswerAndCalculateMetricOfCompany(
				companyCode,
				year,
				answers
			);
			return new SuccessResponse().send(req, res);
		} catch (error) {
			console.log(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

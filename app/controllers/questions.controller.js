import QuestionAction from "../actions/questions.action.js";
import {
	SuccessResponse,
	ErrorResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";

export default class QuestionController {
	static async getAllTopicsAndQuestions(req, res) {
		try {
			const { section, lang } = req.query;
			if (!section) {
				throw new BadRequestResponse().send(req, res);
			}
			const data = await QuestionAction.getAllTopicsAndQuestions(section, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async getAnswersOfYear(req, res) {
		try {
			const { section, year, lang } = req.query;
			const { id: userId } = req.data;
			const data = await QuestionAction.getAnswersOfYear(
				userId,
				section,
				year,
				lang
			);
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
			const { year, answers, section } = req.body;
			const { lang } = req.query;
			await QuestionAction.addAnswerAndCalculateMetricOfCompany(
				userId,
				year,
				answers,
				section,
				lang
			);
			return new SuccessResponse().send(req, res);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async findAllSubmitCountOfSection(req, res) {
		try {
			const { id: userId } = req.data;
			const data = await QuestionAction.findAllSubmitCountOfSection(
				userId
			);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

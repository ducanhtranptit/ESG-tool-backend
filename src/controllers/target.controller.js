import TargetAction from "../actions/target.action.js";
import QuestionAction from "../actions/questions.action.js";
import {
	SuccessResponse,
	ErrorResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";

export default class TargetController {
	static async getAllTopicsAndQuestions(req, res) {
		try {
			const { section, lang } = req.query;
			if (!section) {
				throw new BadRequestResponse().send(req, res);
			}
			const data = await QuestionAction.getAllTopicsAndQuestions(
				section,
				lang
			);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}

	static async findAllSubmitCountOfSection(req, res) {
		try {
			const { id: userId } = req.data;
			const { year } = req.query;
			if (!year || year < 2000 || year > 2100) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await TargetAction.findAllSubmitCountOfSection(
				userId,
				year
			);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}

	static async addAnswerAndCalculateMetricOfCompany(req, res) {
		try {
			const { id: userId } = req.data;
			if (!userId) {
				return new BadRequestResponse().send(req, res);
			}
			const { year, answers, section } = req.body;
			await TargetAction.addAnswerAndCalculateMetricOfCompany(
				userId,
				year,
				answers,
				section
			);
			return new SuccessResponse().send(req, res);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}

	static async getAnswersOfYear(req, res) {
		try {
			const { section, year, lang } = req.query;
			const { id: userId } = req.data;
			const data = await TargetAction.getAnswersOfYear(
				userId,
				section,
				year,
				lang
			);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}
}

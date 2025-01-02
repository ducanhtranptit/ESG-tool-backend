import QuestionAction from "../actions/questions.action.js";
import {
	SuccessResponse,
	ErrorResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";

export default class QuestionController {
	static async getAllQuestionsForAdmin(req, res) {
		try {
			const data = await QuestionAction.findAll();
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}

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
			const data = await QuestionAction.findAllSubmitCountOfSection(
				userId,
				year
			);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}

	static async getAllTopic(req, res) {
		try {
			const data = await QuestionAction.findAllTopics();
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}

	static async getAllAnswersForAdmin(req, res) {
		try {
			const { page, limit, companyCode, year } = req.query;
			const filter = {
				page: parseInt(page, 10) || 1,
				limit: parseInt(limit, 10) || 10,
				companyCode,
				year
			};
			console.log(filter);
			
			const data = await QuestionAction.findAllAnswers(filter);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}

	static async getAllDummiesForAdmin(req, res) {
		try {
			const { page, limit } = req.query;
			const filter = {
				page: parseInt(page, 10) || 1,
				limit: parseInt(limit, 10) || 10,
			};
			const data = await QuestionAction.findAllDummies(filter);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}
}

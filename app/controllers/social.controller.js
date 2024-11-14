import SocialAction from "../actions/social.action.js";
import { SuccessResponse, ErrorResponse } from "../core/ApiResponse.js";

export default class SocialController {
	static async dataSexRatioChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await SocialAction.dataSexRatioChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async dataTrainingChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await SocialAction.dataTrainingChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async dataSalaryChangeChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await SocialAction.dataSalaryChangeChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async dataRiskChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await SocialAction.dataRiskChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async dataExpenditureChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await SocialAction.dataExpenditureChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

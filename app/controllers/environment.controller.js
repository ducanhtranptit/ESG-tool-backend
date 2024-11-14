import EnvironmentAction from "../actions/environment.action.js";
import { SuccessResponse, ErrorResponse } from "../core/ApiResponse.js";

export default class EnvironmentController {
	static async dataEmissionChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await EnvironmentAction.dataEmissionChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async dataWaterChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await EnvironmentAction.dataWaterChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async dataWasteChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await EnvironmentAction.dataWasteChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async dataElectricityChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await EnvironmentAction.dataElectricityChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async dataInkPapersChart(req, res) {
		try {
			const { id: userId } = req.data;
			const { lang } = req.query;
			if (!userId || !lang) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await EnvironmentAction.dataInkPapersChart(userId, lang);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

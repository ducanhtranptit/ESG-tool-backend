import {
	SuccessResponse,
	ErrorResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";
import DashboardAction from "../actions/dashboard.action.js";

export default class DashboardController {
	static async getAllData(req, res) {
		try {
			const { id: userId } = req.data;
			if (!userId) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await DashboardAction.getAllDataForCharts(userId);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res, error.message);
		}
	}
}

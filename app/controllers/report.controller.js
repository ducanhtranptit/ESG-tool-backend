import ReportActions from "../actions/report.action.js";
import { SuccessResponse, ErrorResponse } from "../core/ApiResponse.js";

export default class ReportController {
	static async getAllDataForReport(req, res) {
		try {
			const { year } = req.query;
			const { id: userId } = req.data;
			const data = await ReportActions.getAllDataForReport(year, userId);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

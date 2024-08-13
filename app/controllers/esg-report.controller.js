import { SuccessResponse, ErrorResponse } from "../core/ApiResponse.js";
import EsgReportAction from "../actions/esg-report.action.js";

class EsgReportController {
	static async calculateESGReport(req, res) {
		try {
			await EsgReportAction.calculateESGReport();
			return new SuccessResponse().send(req, res);
		} catch (error) {
			console.log(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

export default EsgReportController;

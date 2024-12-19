import ReportActions from "../actions/report.action.js";
import { SuccessResponse, ErrorResponse } from "../core/ApiResponse.js";
import path from "path";
import { fileURLToPath } from "url";

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

	static async downloadReportTemplate(req, res) {
		try {
			const { filename } = req.query;
			const __filename = fileURLToPath(import.meta.url);
			const __dirname = path.dirname(__filename);
			const filePath = path.join(__dirname, "../templates", filename);
			res.sendFile(filePath, (err) => {
				if (err) {
					console.error("Lỗi khi tải file:", err.message);
					res.status(404).send({ error: "File không tồn tại!" });
				}
			});
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

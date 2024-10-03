import GovernanceAction from "../actions/governance.action.js";
import { SuccessResponse, ErrorResponse } from "../core/ApiResponse.js";

export default class GovernanceController {
	static async dataSexRatioChart(req, res) {
		try {
			const { id: userId } = req.data;
			if (!userId) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await GovernanceAction.dataSexRatioChart(userId);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async dataSupplierRatioChart(req, res) {
		try {
			const { id: userId } = req.data;
			if (!userId) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await GovernanceAction.dataSupplierRatioChart(userId);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async dataViolateChart(req, res) {
		try {
			const { id: userId } = req.data;
			if (!userId) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await GovernanceAction.dataViolateChart(userId);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

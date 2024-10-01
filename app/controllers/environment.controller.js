import { SuccessResponse } from "../core/ApiResponse.js";

export default class EnvironmentController {
	static async testApi(req, res) {
		try {
			const data = { result: "hello world" };
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

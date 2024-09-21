import { SuccessResponse } from "../core/ApiResponse.js";

export default class EnvironmentController {
	static async testApi(req, res) {
		try {
			console.log(req.data);

			const data = { result: "hello world" };
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.log(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

import UserActions from "../actions/user.action.js";
import {
	SuccessResponse,
	ErrorResponse,
	UnauthorizedResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";

export default class UserController {
	static async getAllAccount(req, res) {
		try {
			const data = await UserActions.findAll();
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async getProfile(req, res) {
		try {
			const userId = req?.data.id;
			if (!userId) {
				return new UnauthorizedResponse().send(req, res);
			}
			const data = await UserActions.getProfile(userId);
			if (!data) {
				return new UnauthorizedResponse().send(req, res);
			}
			return new SuccessResponse().send(req, res, data);
		} catch (err) {
			console.error(err);
			return new ErrorResponse().send(req, res);
		}
	}
	static async refreshToken(req, res) {
		try {
			const refreshToken = req.body?.refreshToken;
			if (!refreshToken) {
				console.error("Cannot find refreshToken in request");
				return new BadRequestResponse().send(req, res);
			}
			const newToken = await UserActions.refreshToken(refreshToken);
			if (!newToken) {
				return new BadRequestResponse().send(req, res);
			}
			return new SuccessResponse().send(req, res, newToken);
		} catch (err) {
			console.error(err);
			return new ErrorResponse().send(req, res);
		}
	}
}

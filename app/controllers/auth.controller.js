import AuthActions from "../actions/auth.action.js";
import { SuccessResponse, ErrorResponse, BadRequestResponse } from "../core/ApiResponse.js";

export default class AuthController {
	static async login(req, res) {
		try {
			const { email, password } = req.body;
			if (!email?.trim() || !password?.trim()) {
				return new BadRequestResponse().send(req, res);
			}
			const data = await AuthActions.handleLogin(email, password);
			if (!data) {
				return new BadRequestResponse().send(req, res);
			}
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async logout(req, res) {
		try {
			const token = req.headers["authorization"];
			const accessToken = token?.split("Bearer ")[1];
			const { userId } = req.params;
			const expiresIn = req?.data.exp;
			if (!accessToken || !userId) {
				return new BadRequestResponse().send(req, res);
			}
			await AuthActions.handleLogout(accessToken, expiresIn, userId);
			return new SuccessResponse().send(req, res);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}

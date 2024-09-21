import AuthActions from "../actions/auth.action.js";
import {
	SuccessResponse,
	ErrorResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";

export default class AuthController {
	static async register(req, res) {
		try {
			console.log("88888888888");

			const { username, password } = req.body;
			console.log(username, password);

			if (!username?.trim() || !password?.trim()) {
				return new BadRequestResponse().send(req, res);
			}
			const isRegister = await AuthActions.register(username, password);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async login(req, res) {
		try {
			const { username, password } = req.body;
			if (!username?.trim() || !password?.trim()) {
				return new BadRequestResponse().send(req, res);
			}

			console.log("99999999999");

			console.log(username, password);

			const data = await AuthActions.handleLogin(username, password);
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
			const userId = req?.data.id;
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

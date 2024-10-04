import { signToken, verifyToken } from "../utils/jwt.js";
import config from "../../config/config.js";
import model from "../models/index.js";

export default class UserActions {
	static async getProfile(id) {
		const user = await model.User.findByPk(id);
		if (!user) {
			return null;
		}
		return {
			id: user.id,
			email: user.email,
			type: user.type,
		};
	}
	static async refreshToken(refreshToken) {
		const user = await model.User.findOne({
			where: { refreshToken },
		});
		if (!user) {
			return null;
		}

		const newToken = UserActions.signToken({ id: user.id });

		if (!newToken) {
			return null;
		}

		await model.User.update(
			{ refreshToken: newToken.refreshToken },
			{ where: { id: user.id } }
		);

		return newToken;
	}

	static signToken(payload) {
		const accessToken = signToken(payload, config.accessTokenSecret, {
			expiresIn: config.accessTokenExpires,
		});
		const refreshToken = signToken(payload, config.refreshTokenSecret, {
			expiresIn: config.refreshTokenExpires,
		});
		if (!accessToken || !refreshToken) {
			return false;
		}
		return { accessToken, refreshToken };
	}
}

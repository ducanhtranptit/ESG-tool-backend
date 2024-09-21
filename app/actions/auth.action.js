import model from "../models/index.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { signToken } from "../utils/jwt.js";
import config from "../../config/config.js";

export default class AuthActions {
	static async handleRegister(username, password) {
		const existingUser = await this.checkExist(username);
		if (existingUser) {
			return false;
		}
		const hashedPassword = await hashPassword(password);
		const newUser = await model.User.create({
			username,
			password: hashedPassword,
		});
		if (newUser) {
			const tokens = this.signToken({ id: newUser.id });
			if (tokens) {
				await model.User.update(
					{ refreshToken: tokens.refreshToken },
					{ where: { id: newUser.id } }
				);
				return { id: newUser.id, ...tokens };
			} else {
				return false;
			}
		}

		return false;
	}

	static async handleLogin(username, password) {
		const user = await this.checkExist(username);
		if (!user) {
			return false;
		}
		const isMatchPassword = this.verifyPassword(password, user.password);
		if (!isMatchPassword) {
			return false;
		}
		const tokens = this.signToken({ id: user.id });
		if (!tokens) {
			return false;
		}
		await model.User.update(
			{ refreshToken: tokens.refreshToken },
			{ where: { id: user.id } }
		);
		return { id: user.id, ...tokens };
	}

	static async handleLogout(accessToken, expiresIn, userId) {
		await model.BlackList.create({
			token: accessToken,
			userId,
			expiresIn,
		});
	}

	static checkExist(username) {
		const user = model.User.findOne({ where: { username } });
		return user;
	}

	static verifyPassword(password, hashPassword) {
		return comparePassword(password, hashPassword);
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

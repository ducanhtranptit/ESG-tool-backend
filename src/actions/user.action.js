import { signToken, verifyToken } from "../utils/jwt.js";
import config from "../../config/config.js";
import model from "../models/index.js";
import UserType from "../constants/user-type.constant.js";
import { Op } from "sequelize";

export default class UserActions {
	static buildSearchConditions(filters) {
		const conditions = {};
		if (filters.username) {
			conditions.username = {
				[Sequelize.Op.like]: `%${filters.username}%`,
			};
		}
		if (filters.id) {
			conditions.id = filters.id;
		}
		if (filters.companyId) {
			conditions.companyId = filters.companyId;
		}
		return conditions;
	}
	static async findAll() {
		const users = await model.User.findAll({
			where: {
				type: {
					[Op.not]: UserType.ADMIN,
				},
			},
			attibutes: ["username", "companyId", "type"],
			raw: true,
		});
		const result = [];

		for (const user of users) {
			const company = await model.Company.findOne({
				where: {
					id: user.companyId,
				},
			});

			result.push({
				userId: user.id,
				username: user.username,
				company: company.companyCode,
				status: user.type === 3 ? "Inactive" : "Active",
			});
		}

		return result;
	}
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
			console.error("Cannot find user by refreshToken");
			return null;
		}

		const newToken = UserActions.signToken({ id: user.id });

		if (!newToken) {
			console.error("Cannot sign new refreshToken");
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

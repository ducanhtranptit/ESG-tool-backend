import { UnauthorizedResponse } from "../../core/ApiResponse.js";
import config from "../../../config/config.js";
import UserType from "../../constants/user-type.constant.js";
import { verifyToken } from "../../utils/jwt.js";
import model from "../../models/index.js";

const verifyTokenMiddleware = async (req, res, next) => {
	try {
		const authorizationHeader = req.headers["authorization"];
		if (
			!authorizationHeader ||
			!authorizationHeader.startsWith("Bearer ")
		) {
			console.log("Authorization header not found");
			return new UnauthorizedResponse().send(req, res);
		}

		const accessToken = authorizationHeader.split("Bearer ")[1];
		if (!accessToken) {
			console.log("Access token not found");
			return new UnauthorizedResponse().send(req, res);
		}

		const tokenIsBlacklisted = await model.BlackList.findOne({
			where: { token: accessToken },
		});

		if (tokenIsBlacklisted) {
			console.log("Token is blacklisted");
			return new UnauthorizedResponse().send(req, res);
		}

		const payload = verifyToken(accessToken, config.accessTokenSecret);
		if (!payload || !payload.decoded) {
			console.log("Invalid token");
			return new UnauthorizedResponse().send(req, res);
		}

		const user = await model.User.findOne({
			where: {
				id: payload.decoded.id,
			},
			raw: true,
		});

		if (user.type !== UserType.USER && user.type !== 3) {
			console.log("Invalid user type");
			return new UnauthorizedResponse().send(req, res);
		}

		req.data = payload.decoded;
		next();
	} catch (error) {
		console.error(error);
		return new UnauthorizedResponse().send(req, res);
	}
};

export default verifyTokenMiddleware;

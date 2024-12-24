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
			return new UnauthorizedResponse().send(
				req,
				res,
				"Authorization header not found"
			);
		}

		const accessToken = authorizationHeader.split("Bearer ")[1];
		if (!accessToken) {
			console.log("Access token not found");
			return new UnauthorizedResponse().send(
				req,
				res,
				"Access token not found"
			);
		}

		const tokenIsBlacklisted = await model.BlackList.findOne({
			where: { token: accessToken },
		});

		if (tokenIsBlacklisted) {
			console.log("Token is blacklisted");
			return new UnauthorizedResponse().send(
				req,
				res,
				"Token is blacklisted"
			);
		}

		const payload = verifyToken(accessToken, config.accessTokenSecret);
		if (!payload || !payload.decoded) {
			console.log("Invalid token");
			return new UnauthorizedResponse().send(req, res, "Invalid token");
		}

		const user = await model.User.findOne({
			where: {
				id: payload.decoded.id,
			},
			raw: true,
		});
		
		req.data = {
			...payload.decoded,
			type: user.type,
		};
		next();
	} catch (error) {
		console.error(error);
		return new UnauthorizedResponse().send(req, res);
	}
};

export default verifyTokenMiddleware;

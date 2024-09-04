import { UnauthorizedResponse } from "../../core/ApiResponse.js";
import config from "../../../config/config.js";
import { verifyToken } from "../../utils/jwt.js";
import model from "../../models/index.js";

const verifyTokenMiddleware = async (req, res, next) => {
	try {
		const authorizationHeader = req.headers["authorization"];
		if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
			return new UnauthorizedResponse().send(req, res);
		}

		const accessToken = authorizationHeader.split("Bearer ")[1];
		if (!accessToken) {
			return new UnauthorizedResponse().send(req, res);
		}

		const tokenIsBlacklisted = await model.BlackList.findOne({
			where: { token: accessToken },
		});

		if (tokenIsBlacklisted) {
			return new UnauthorizedResponse().send(req, res);
		}

		const payload = verifyToken(accessToken, config.accessTokenSecret);
		if (!payload || !payload.decoded) {
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

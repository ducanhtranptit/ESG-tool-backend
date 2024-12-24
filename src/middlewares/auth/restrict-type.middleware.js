import { UnauthorizedResponse } from "../../core/ApiResponse.js";
import UserType from "../../constants/user-type.constant.js";

const restrictTypeMiddleware = (req, res, next) => {
	try {
		if (!req.data || !req.data.id || req.data.type === undefined) {
			console.log("User data not found in request");
			return new UnauthorizedResponse().send(
				req,
				res,
				"User data not found"
			);
		}
		if (req.data.type === UserType.USER_NOT_ACTIVE) {
			console.log("Access denied for user.type === 3");
			return new UnauthorizedResponse().send(
				req,
				res,
				"Access denied for user.type === 3"
			);
		}
		next();
	} catch (error) {
		console.error(error);
		return new UnauthorizedResponse().send(req, res);
	}
};

export default restrictTypeMiddleware;

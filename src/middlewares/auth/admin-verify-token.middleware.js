import { UnauthorizedResponse } from "../../core/ApiResponse.js";
import UserType from "../../constants/user-type.constant.js";

const verifyAdminMiddleware = (req, res, next) => {
	try {
		if (!req.data || !req.data.id || req.data.type === undefined) {
			console.log("User data not found in request");
			return new UnauthorizedResponse().send(
				req,
				res,
				"User data not found"
			);
		}
		if (req.data.type !== UserType.ADMIN) {
			console.log("Access denied");
			return new UnauthorizedResponse().send(
				req,
				res,
				"Access denied"
			);
		}
		next();
	} catch (error) {
		console.error(error);
		return new UnauthorizedResponse().send(req, res);
	}
};

export default verifyAdminMiddleware;

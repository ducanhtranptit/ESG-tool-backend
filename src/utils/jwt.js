import jwt from "jsonwebtoken";

export const signToken = (payload, secret, options = { expiresIn: "15m" }) => {
	if (payload && secret) {
		return jwt.sign(payload, secret, options);
	}
	return null;
};
export const verifyToken = (token, secret) => {
	try {
		const decoded = jwt.verify(token, secret);
		return { valid: true, expired: false, decoded };
	} catch (error) {
		let msg;
		if (error instanceof Error) {
			msg = error.message;
		} else {
			msg = error;
		}
		return {
			valid: false,
			expired: msg === "Token expired",
			msg: msg,
			decoded: null,
		};
	}
};

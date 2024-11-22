import config from "../../../config/config.js";
const verifyApiKey = (req, res, next) => {
	const apiKey = req.headers["x-api-key"];

	if (!apiKey) {
		return res.status(401).json({ error: "API key is required" });
	}

	const validApiKey = config.reportTemplateApiKey;

	if (apiKey !== validApiKey) {
		return res.status(403).json({ error: "Invalid API key" });
	}

	next();
};

export default verifyApiKey;

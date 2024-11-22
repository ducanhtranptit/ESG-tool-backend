import dotenv from "dotenv";

dotenv.config();

const config = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "mysql",
		logging: false,
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "mysql",
		logging: false,
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "mysql",
		logging: false,
	},
	baseUrl: "/api/v1/core",
	accessTokenSecret: process.env.ACCESSTOKEN_SECRET,
	refreshTokenSecret: process.env.REFRESHTOKEN_SECRET,
	accessTokenExpires: process.env.ACCESSTOKEN_EXPIRE,
	refreshTokenExpires: process.env.REFRESHTOKEN_EXPIRE,
	reportTemplateApiKey: process.env.REPORT_TEMPLATE_APIKEY,
};

export default config;

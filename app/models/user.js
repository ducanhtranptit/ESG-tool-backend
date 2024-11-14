"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {}
	}
	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			companyId: DataTypes.INTEGER,
			accessToken: DataTypes.STRING,
			refreshToken: DataTypes.STRING,
			type: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};

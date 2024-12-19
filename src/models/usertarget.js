"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class UserTarget extends Model {
		static associate(models) {}
	}
	UserTarget.init(
		{
			sectionId: DataTypes.INTEGER,
			sectionName: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			year: DataTypes.INTEGER,
			submitCount: DataTypes.INTEGER,
			percentileCompleted: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "UserTarget",
		}
	);
	return UserTarget;
};

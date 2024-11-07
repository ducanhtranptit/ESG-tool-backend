"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class UserSection extends Model {
		static associate(models) {}
	}
	UserSection.init(
		{
			sectionId: DataTypes.INTEGER,
			sectionName: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			submitCount: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "UserSection",
		}
	);
	return UserSection;
};

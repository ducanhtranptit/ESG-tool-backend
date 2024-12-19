"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Company extends Model {
		static associate(models) {}
	}
	Company.init(
		{
			companyCode: DataTypes.STRING,
			companyName: DataTypes.STRING,
			industryId: DataTypes.INTEGER,
			industryCodeLevel2: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Company",
		}
	);
	return Company;
};

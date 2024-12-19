import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class CriteriaLocales extends Model {
		static associate(models) {}
	}
	CriteriaLocales.init(
		{
			criteriaCode: DataTypes.INTEGER,
			name: DataTypes.TEXT,
			language: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "CriteriaLocale",
		}
	);
	return CriteriaLocales;
};

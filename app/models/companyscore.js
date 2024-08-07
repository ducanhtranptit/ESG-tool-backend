import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class CompanyScore extends Model {
		static associate(models) {}
	}

	CompanyScore.init(
		{
			firstName: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "CompanyScore",
		}
	);

	return CompanyScore;
};

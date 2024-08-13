import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class CompanyScore extends Model {
		static associate(models) {}
	}

	CompanyScore.init(
		{
			companyId: DataTypes.INTEGER,
			companyCode: DataTypes.STRING,
			year: DataTypes.INTEGER,
			environmentScore: DataTypes.FLOAT,
			socialScore: DataTypes.FLOAT,
			governanceScore: DataTypes.FLOAT,
			esgScore: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "CompanyScore",
		}
	);

	return CompanyScore;
};

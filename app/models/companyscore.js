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
			environmentRank: DataTypes.INTEGER,
			socialScore: DataTypes.FLOAT,
			socialRank: DataTypes.INTEGER,
			governanceScore: DataTypes.FLOAT,
			governanceRank: DataTypes.INTEGER,
			esgScore: DataTypes.FLOAT,
			esgRank: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "CompanyScore",
		}
	);

	return CompanyScore;
};

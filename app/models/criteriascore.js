import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class CriteriaScore extends Model {
		static associate(models) {}
	}

	CriteriaScore.init(
		{
			criteriaCode: DataTypes.INTEGER,
			companyCode: DataTypes.STRING,
			criteriaId: DataTypes.INTEGER,
			year: DataTypes.INTEGER,
			metricId: DataTypes.INTEGER,
			scoreMultipleNewCriteriaWeight: DataTypes.FLOAT,
			scoreMultipleCriteriaWeight: DataTypes.FLOAT,
			score: DataTypes.FLOAT,
			pillarId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "CriteriaScore",
		}
	);

	return CriteriaScore;
};

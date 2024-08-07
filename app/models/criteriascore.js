import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class CriteriaScore extends Model {
		static associate(models) {}
	}

	CriteriaScore.init(
		{
			firstName: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "CriteriaScore",
		}
	);

	return CriteriaScore;
};

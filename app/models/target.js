import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Target extends Model {
		static associate(models) {}
	}
	Target.init(
		{
			questionCode: DataTypes.STRING,
			companyCode: DataTypes.STRING,
			yearTarget: DataTypes.INTEGER,
			targetValue: DataTypes.FLOAT,
			weight: DataTypes.FLOAT,
			polarityIndicating: DataTypes.STRING,
			percentileCompleted: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Target",
		}
	);
	return Target;
};

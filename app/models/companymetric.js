import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class CompanyMetric extends Model {
		static associate(models) {}
	}

	CompanyMetric.init(
		{
			metricId: DataTypes.INTEGER,
			companyCode: DataTypes.STRING,
			year: DataTypes.INTEGER,
			metric: DataTypes.FLOAT,
			criteriaCode: DataTypes.INTEGER,
			criteriaId: DataTypes.INTEGER,
			companyId: DataTypes.INTEGER,
			noOfCompaniesWithAValue: DataTypes.INTEGER,
			noOfCompaniesWithTheSameValueIncludedInTheCurrentOne: DataTypes.INTEGER,
			noOfCompaniesWithAWorse: DataTypes.INTEGER,
			rank: DataTypes.INTEGER,
			score: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "CompanyMetric",
		}
	);

	return CompanyMetric;
};
